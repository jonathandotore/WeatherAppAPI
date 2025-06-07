using WeatherAppAPI.Dtos;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Interfaces
{
    public interface IWeatherService
    {
        Task<ServiceResponse<CurrentWeatherDto>> GetCurrentWeatherAsync(string cityName);
        Task<ServiceResponse<List<WeatherAllDayDto>>> GetForecastWeatherForFiveDaysAsync(string cityName);

    }
}
