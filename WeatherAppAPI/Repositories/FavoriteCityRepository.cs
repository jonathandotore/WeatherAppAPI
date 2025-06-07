using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Data;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Repositories
{
    public class FavoriteCityRepository : IFavoriteCityRepository
    {
        readonly AppDbContext _context;

        public FavoriteCityRepository(AppDbContext context)
            => _context = context;


        public async Task<ServiceResponse<List<FavoriteCity>>> ListFavCitiesAsync()
        {
            ServiceResponse<List<FavoriteCity>> response = new();

            try
            {
                var cities = await _context.FavoriteCity.ToListAsync();

                if (cities.Count == 0)
                {
                    response.Data = null;
                    response.Message = "Cities not found";
                    response.Status = false;
                }

                response.Data = cities;
                response.Message = "Cities successfully found!";
                response.Status = true;

                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Message = ex.Message;
                response.Status = false;

                return response;
            }
        }
        public Task<ServiceResponse<FavoriteCity>> GetFavoriteCityAsync()
        {
            throw new NotImplementedException();
        }
        public Task AddFavoriteCityAsync(FavoriteCity city)
        {
            throw new NotImplementedException();
        }
        public Task RemoveFavoriteCityAsync(FavoriteCity city)
        {
            throw new NotImplementedException();
        }
    }
}
