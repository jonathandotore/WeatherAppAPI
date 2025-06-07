using WeatherAppAPI.Data;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Repositories
{
    public class FavoriteCityRepository : IFavoriteCity
    {
        readonly AppDbContext _context;

        public FavoriteCityRepository(AppDbContext context)
            => _context = context;

        public Task AddFavoriteCityAsync(FavoriteCity city)
        {
            throw new NotImplementedException();
        }

        public Task<FavoriteCity> GetFavoriteCityAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<FavoriteCity>> ListFavCitiesAsync()
        {
            throw new NotImplementedException();
        }

        public Task RemoveFavoriteCityAsync(FavoriteCity city)
        {
            throw new NotImplementedException();
        }
    }
}
