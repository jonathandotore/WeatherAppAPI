using WeatherAppAPI.Model;

namespace WeatherAppAPI.Interfaces
{
    public interface IFavoriteCity
    {
        Task<List<FavoriteCity>> ListFavCitiesAsync();
        Task<FavoriteCity> GetFavoriteCityAsync();
        Task AddFavoriteCityAsync(FavoriteCity city);
        Task RemoveFavoriteCityAsync(FavoriteCity city);
    }
}
