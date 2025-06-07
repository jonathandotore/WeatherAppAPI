using Newtonsoft.Json;
using System.Text.Json;
using WeatherAppAPI.Dtos;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Services
{
    public class WeatherService : IWeatherService
    {
        readonly HttpClient _httpClient;
        readonly IConfiguration _config;

        public WeatherService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<ServiceResponse<CurrentWeatherDto>> GetWeatherAsync(string cityName)
        {
            string apiKey = _config["OpenWeather:ApiKey"];
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}&units=metric&lang=pt_br";
            ServiceResponse<CurrentWeatherDto> response = new();

            try
            {
                var resp = await _httpClient.GetAsync(url);
                if (!resp.IsSuccessStatusCode)
                    return null;

                var json = await resp.Content.ReadAsStringAsync();
                var weatherDto = JsonConvert.DeserializeObject<CurrentWeatherDto>(json);

                response.Data = weatherDto;
                response.Message = "City weather succesfully found!";
                response.Status = false;

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
    }
}
