using Microsoft.AspNetCore.Mvc;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteCityController : ControllerBase
    {
        readonly IFavoriteCityRepository _favCityRepo;

        public FavoriteCityController(IFavoriteCityRepository repo)
            => _favCityRepo = repo;

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<FavoriteCity>>>> ListFavCitiesAsync()
        {
            var cities = await _favCityRepo.ListFavCitiesAsync();

            if (cities == null)
                return NotFound();

            return Ok(cities);
        }
    }
}
