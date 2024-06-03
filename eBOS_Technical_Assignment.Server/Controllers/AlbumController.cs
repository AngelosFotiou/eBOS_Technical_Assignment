﻿using eBOS_Technical_Assignment.Server.DbObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eBOS_Technical_Assignment.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlbumsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/albums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
        {
            return await _context.Albums.ToListAsync();
        }

        // GET: api/albums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
            {
                return NotFound();
            }

            return album;
        }

        // POST: api/albums
        [HttpPost]
        public async Task<ActionResult<Album>> PostAlbum(Album album)
        {
            _context.Albums.Add(album);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlbum), new { id = album.Id }, album);
        }

        // POST: api/albums/add-multiple
        [HttpPost("add-multiple")]
        public async Task<ActionResult<IEnumerable<Album>>> AddAlbums([FromBody] List<Album> albums)
        {
            if (albums == null || albums.Count == 0)
            {
                return BadRequest("The album list is empty.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Set IDENTITY_INSERT ON
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Albums ON");

                _context.Albums.AddRange(albums);
                await _context.SaveChangesAsync();

                // Set IDENTITY_INSERT OFF
                await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Albums OFF");

                await transaction.CommitAsync();
                return Ok(albums);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
              
                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while adding albums.");
            }
        }

        // PUT: api/albums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum(int id, Album album)
        {
            if (id != album.Id)
            {
                return BadRequest();
            }

            _context.Entry(album).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
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

        // DELETE: api/albums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlbumExists(int id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }
    }



}