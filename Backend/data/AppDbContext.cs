using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Usuario> tb_usuario { get; set; }

        public DbSet<Modulo> tb_modulo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.HasPostgresEnum<Dificuldade>();
            modelBuilder.HasPostgresEnum<Roles>();

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>().Property(u => u.Id).ValueGeneratedOnAdd();
        }

    }
}