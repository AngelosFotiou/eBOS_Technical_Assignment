using Microsoft.EntityFrameworkCore;

namespace eBOS_Technical_Assignment.Server.DbObjects
{
    public class AppDbContext(IConfiguration configuration) : DbContext
    {
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<User> Users { get; set; }

        public IConfiguration _configuration { get; set; } = configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("LocalSqlServer"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
               .Property(p => p.Id)
               .ValueGeneratedOnAdd();
            modelBuilder.Entity<User>()
                .OwnsOne(u => u.Address)
                .OwnsOne(a => a.Geo);

            modelBuilder.Entity<User>()
                .OwnsOne(u => u.Company);

            modelBuilder.Entity<Photo>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Album>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();
        }

    }

}

