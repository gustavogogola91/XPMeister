using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Usuario> tb_usuario { get; set; }

        public DbSet<Aula> tb_aula { get; set; }

        public DbSet<Modulo> tb_modulo { get; set; }

        public DbSet<Desafio> tb_desafios { get; set; }

        public DbSet<Post> tb_posts { get; set; }

        public DbSet<Comentario> tb_comentario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.HasPostgresEnum<Dificuldade>();
            modelBuilder.HasPostgresEnum<Roles>();

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>().Property(u => u.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Aula>().Property(a => a.Id).ValueGeneratedOnAdd();
        }

    }
}