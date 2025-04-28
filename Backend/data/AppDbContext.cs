using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Model;

namespace Backend.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Aula> tb_aula { get; set; }

        public DbSet<Modulo> tb_modulo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.HasPostgresEnum<Dificuldade>();

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>().Property(u => u.Id).ValueGeneratedOnAdd();
        }

    }
}