using Microsoft.EntityFrameworkCore;

namespace Backend.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        
    }
}