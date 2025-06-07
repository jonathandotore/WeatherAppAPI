using WeatherAppAPI.Dtos;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Interfaces
{
    public interface IWeatherService
    {
        Task<ServiceResponse<CurrentWeatherDto>> GetWeatherAsync(string cityName);
        Task<ServiceResponse<List<WeatherAllDayDto>>> GetForecastWeatherForFiveDays(string cityName);

    }
}
