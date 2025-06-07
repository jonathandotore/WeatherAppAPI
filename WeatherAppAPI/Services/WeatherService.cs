using Newtonsoft.Json;
using System.Text.Json;
using WeatherAppAPI.Dtos;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;
using static WeatherAppAPI.Model.CurrentDayWeatherResponse;
using static WeatherAppAPI.Model.OpenWeatherResponse;

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

        public async Task<ServiceResponse<CurrentWeatherDto>> GetCurrentWeatherAsync(string cityName)
        {
            string apiKey = _config["OpenWeather:ApiKey"];
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}&units=metric&lang=pt_br";
            ServiceResponse<CurrentWeatherDto> response = new() { Data = null };

            try
            {
                var resp = await _httpClient.GetAsync(url);
                if (!resp.IsSuccessStatusCode)
                    return response;

                var json = await resp.Content.ReadAsStringAsync();
                var weatherResponse = JsonConvert.DeserializeObject<WeatherResponse>(json);

                if (weatherResponse?.Main == null)
                    return response;

                response.Data = new CurrentWeatherDto()
                {
                    CityName = weatherResponse.Name,
                    Temperature = weatherResponse.Main.Temp,
                    MinTemperature = weatherResponse.Main.TempMin,
                    MaxTemperature = weatherResponse.Main.TempMax,
                    Condition = weatherResponse.Weather.First().Description,
                    Humidity = weatherResponse.Main.Humidity,
                    Icon = weatherResponse.Weather.First().Icon
                };
                
                response.Message = "City weather succesfully found!";
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

        public async Task<ServiceResponse<List<WeatherAllDayDto>>> GetForecastWeatherForFiveDaysAsync(string cityName)
        {
            string apiKey = _config["OpenWeather:ApiKey"];
            string url = $"https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apiKey}&units=metric&lang=pt_br";
            ServiceResponse<List<WeatherAllDayDto>> response = new();

            try
            {
                var resp = await _httpClient.GetAsync(url);
                if (!resp.IsSuccessStatusCode)
                    return new ServiceResponse<List<WeatherAllDayDto>>() { Data = null };

                var json = await resp.Content.ReadAsStringAsync();
                var weatherForecastAllDay = JsonConvert.DeserializeObject<ForecastRoot>(json);


                if (weatherForecastAllDay?.List == null)
                    return new ServiceResponse<List<WeatherAllDayDto>> { Data = null };

                var groupedByDay = weatherForecastAllDay.List
                                    .GroupBy(x => DateTime.Parse(x.DtTxt).Date)
                                    .Take(5);

                var result = new List<WeatherAllDayDto>();

                foreach (var day in groupedByDay)
                {
                    double minTemperature = day.Min(t => t.MainForecast.MinTemperature);
                    double maxTemperature = day.Max(t => t.MainForecast.MaxTemperature);
                    string condition = day.First().Weather.First().Description;

                    result.Add(new WeatherAllDayDto()
                    {
                        Date = day.Key,
                        MinTemperature = minTemperature,
                        MaxTemperature = maxTemperature,
                        Condition = condition
                    });
                }

                response.Data = result;
                response.Message = "Forecast succesfully found!";
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
    }
}
 