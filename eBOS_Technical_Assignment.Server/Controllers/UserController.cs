using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
namespace eBOS_Technical_Assignment.Server.Controllers
{


   
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(DbObjects.AppDbContext context) : ControllerBase
    {
        private readonly DbObjects.AppDbContext _context = context;

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbObjects.User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DbObjects.User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<DbObjects.User>> PostUser(DbObjects.User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // POST: api/users/add-multiple
        [HttpPost("add-multiple")]
        public async Task<ActionResult<IEnumerable<DbObjects.User>>> AddUsers([FromBody] List<DbObjects.User> users)
        {
            if (users == null || users.Count == 0)
            {
                return BadRequest("The user list is empty.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Set IDENTITY_INSERT ON
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Users ON");

                _context.Users.AddRange(users);
                await _context.SaveChangesAsync();

                // Set IDENTITY_INSERT OFF
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Users OFF");

                await transaction.CommitAsync();
                return Ok(users);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while adding users.");
            }
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, DbObjects.User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpGet("GetPaginated")]
        public async Task<IActionResult> GetPaginatedPhotos([FromQuery] int _page,[FromQuery] int limit = 10){
    var paginatedUsers = await _context.Users
                                       .Skip(_page * limit)
                                       .Take(limit)
                                       .ToListAsync();
    return Ok(paginatedUsers);
    }

    private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }



}
