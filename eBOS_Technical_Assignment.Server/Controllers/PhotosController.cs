using eBOS_Technical_Assignment.Server.DbObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eBOS_Technical_Assignment.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController(DbObjects.AppDbContext context) : ControllerBase
    {
        private readonly DbObjects.AppDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbObjects.Photo>>> GetAlPhotos()
        {
            return await _context.Photos.ToListAsync();
        }
        // POST: api/photos/add-multiple
        [HttpPost("add-multiple")]
        public async Task<ActionResult<IEnumerable<DbObjects.Photo>>> AddPhotos([FromBody] List<DbObjects.Photo> photos)
        {
            if (photos == null || photos.Count == 0)
            {
                return BadRequest("The photo list is empty.");
            }
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Set IDENTITY_INSERT ON
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Photos ON");

                _context.Photos.AddRange(photos);
                await _context.SaveChangesAsync();

                // Set IDENTITY_INSERT OFF
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Photos OFF");
                await transaction.CommitAsync();
                return Created();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                // Return a 500 Internal Server Error response
                return StatusCode(500, $"An error occurred while adding photos.{ex.Message} InnerException:{ex.InnerException?.Message ?? string.Empty}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DbObjects.Photo>> GetPhoto(int id)
        {
            var photo = await _context.Photos.FindAsync(id);

            if (photo == null)
            {
                return NotFound();
            }

            return photo;
        }

        [HttpPost]
        public async Task<ActionResult<DbObjects.Photo>> PostPhoto(DbObjects.Photo photo)
        {
            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPhoto), new { id = photo.AlbumId }, photo);
        }

        [HttpPut()]
        public async Task<IActionResult> PutPhoto(DbObjects.Photo photo)
        {
            if (!photo.IsValid() || PhotoExists(photo.Id))
            {
                return BadRequest();
            }

            _context.Entry(photo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotoExists(photo.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var Photo = await _context.Photos.FindAsync(id);
            if (Photo == null)
            {
                return NotFound();
            }

            _context.Photos.Remove(Photo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("GetPaginated")]
        public async Task <IActionResult> GetPaginatedPhotos([FromQuery] int _page ) {

            int _limit = 10;
            var paginatedPhotos = await _context.Photos.Skip(_page  * _limit).Take(_limit).ToListAsync();
            
            return Ok(paginatedPhotos); 
        }


        private bool PhotoExists(int id)
        {
            return _context.Photos.Any(e => e.AlbumId == id);
        }
    }




}
