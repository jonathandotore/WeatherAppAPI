using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeatherAppAPI.Dtos;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService weatherService)
         => _weatherService = weatherService;

        /// <summary>
        /// Returns a weahter forecast for the next five days
        /// </summary>
        /// <param name="city">City Name</param>
        /// <returns>Weather forescast list by day</returns>
        [HttpGet("weatherforecastfivedays/{city}")]
        public async Task<ActionResult<ServiceResponse<List<WeatherAllDayDto>>>> GetForecastWeatherForFiveDays(string city)
        {
            if (string.IsNullOrEmpty(city))
                return BadRequest("Your search cannot be completed, city name is required!");

            var forecasts = await _weatherService.GetForecastWeatherForFiveDays(city);

            if (forecasts == null)
                return NotFound($"Not found");

            
            return Ok(forecasts);
        }
    }
}
