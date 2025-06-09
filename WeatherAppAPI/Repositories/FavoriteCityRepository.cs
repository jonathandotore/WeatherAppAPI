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

        public async Task<ServiceResponse<List<FavoriteCity>>> GetFavoriteCitiesByUserIdAsync(Guid userId)
        {
            ServiceResponse<List<FavoriteCity>> response = new();

            try
            {
                var cities = await _context.FavoriteCity
                                           .Where(fc => fc.UserId == userId)
                                           .ToListAsync();

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
        public async Task<ServiceResponse<FavoriteCity>> AddFavoriteCityAsync(Guid userId, string cityName)
        {
            ServiceResponse<FavoriteCity> response = new();

            try
            {
                var normalizedCityName = cityName.Trim().ToLower();

                var existingCity = await _context.FavoriteCity
                                                 .FirstOrDefaultAsync(fc => fc.UserId == userId && fc.CityName.ToLower() == normalizedCityName);

                if (existingCity != null)
                {
                    response.Message = "Cidade já está nos favoritos";
                    response.Status = false;
                }

                var favCity = new FavoriteCity()
                {
                    CityName = cityName.Trim(),
                    UserId = userId
                };

                _context.FavoriteCity.Add(favCity);
                await _context.SaveChangesAsync();

                response.Data = favCity;
                response.Status = true;
                response.Message = "Cidade adicionada as favoritos";

                return response;

            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = $"Error adding favorite city: {ex.Message}";

                return response;
            }
        }
        public async Task<ServiceResponse<bool>> RemoveFavoriteCityAsync(Guid userId, string cityName)
        {
            var response = new ServiceResponse<bool>();
            try
            {
                var normalizedCityName = cityName.Trim().ToLower();

                var favoriteCity = await _context.FavoriteCity
                                                 .FirstOrDefaultAsync(fc => fc.UserId == userId && fc.CityName.ToLower() == normalizedCityName);

                if (favoriteCity == null)
                {
                    response.Status = false;
                    response.Message = "Cidade favorita não encontrada para este usuário.";
                    return response;
                }

                _context.FavoriteCity.Remove(favoriteCity);
                await _context.SaveChangesAsync();

                response.Data = true;
                response.Message = "Cidade removiaa dos favoritos com sucesso!";
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = $"Erro ao remover a cidade: {ex.Message}";
            }
            return response;
        }
        public async Task<ServiceResponse<bool>> IsCityFavoriteAsync(Guid userId, string cityName)
        {
            var response = new ServiceResponse<bool>();
            try
            {
                var normalizedCityName = cityName.Trim().ToLower();
                response.Data = await _context.FavoriteCity
                                                     .AnyAsync(fc => fc.UserId == userId && fc.CityName.ToLower() == normalizedCityName);
                response.Status = true;
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = $"Erro ao checar o status: {ex.Message}";
                response.Data = false;
            }
            return response;
        }
    }
}
