using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) :base(options) {}

        public DbSet<FavoriteCity> FavoriteCity { get; set; }
        public DbSet<User> User{ get; set; }
    }
}
 