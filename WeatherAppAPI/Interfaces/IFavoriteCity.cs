using WeatherAppAPI.Model;

namespace WeatherAppAPI.Interfaces
{
    public interface IFavoriteCityRepository
    {
        Task<ServiceResponse<List<FavoriteCity>>> ListFavCitiesAsync();
        Task<ServiceResponse<FavoriteCity>> GetFavoriteCityAsync();
        Task AddFavoriteCityAsync(FavoriteCity city);
        Task RemoveFavoriteCityAsync(FavoriteCity city);
    }
}
