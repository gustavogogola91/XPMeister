using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>().Property(u=>u.Id).ValueGeneratedOnAdd();
        }
        
    }
}