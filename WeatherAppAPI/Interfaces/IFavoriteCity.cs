using WeatherAppAPI.Model;

namespace WeatherAppAPI.Interfaces
{
    public interface IFavoriteCityRepository
    {
        Task<ServiceResponse<List<FavoriteCity>>> GetFavoriteCitiesByUserIdAsync(Guid userId);
        Task<ServiceResponse<FavoriteCity>> AddFavoriteCityAsync(Guid userId, string cityName);
        Task<ServiceResponse<bool>> RemoveFavoriteCityAsync(Guid userId, string cityName);
        Task<ServiceResponse<bool>> IsCityFavoriteAsync(Guid userId, string cityName);
    }
}
