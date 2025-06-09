using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WeatherAppAPI.Data;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Model;

namespace WeatherAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoriteCityController : ControllerBase
    {
        readonly IFavoriteCityRepository _favCityRepo;

        public FavoriteCityController(IFavoriteCityRepository repo, AppDbContext context)
           => _favCityRepo = repo;

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<FavoriteCity>>>> GetUserFavoriteCities()
        {
            try
            {
                var userId = GetUserIdFromClaims();
                var result = await _favCityRepo.GetFavoriteCitiesByUserIdAsync(userId);

                if (!result.Status)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new ServiceResponse<List<FavoriteCity>> { Status = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ServiceResponse<List<FavoriteCity>> { Status = false, Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<FavoriteCity>>> AddFavoriteCity([FromBody] string cityName)
        {
            try
            {
                var userId = GetUserIdFromClaims();
                var result = await _favCityRepo.AddFavoriteCityAsync(userId, cityName);

                if (!result.Status)
                {
                    // Se a cidade já existe, ou outro erro específico do repositório
                    return BadRequest(result);
                }
                return Ok(result); 
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new ServiceResponse<FavoriteCity> { Status = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ServiceResponse<FavoriteCity> { Status = false, Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpDelete("{cityName}")]
        public async Task<ActionResult<ServiceResponse<bool>>> RemoveFavoriteCity(string cityName)
        {
            try
            {
                var userId = GetUserIdFromClaims();
                var result = await _favCityRepo.RemoveFavoriteCityAsync(userId, cityName);

                if (!result.Status)
                    return BadRequest(result);

                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new ServiceResponse<bool> { Status = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ServiceResponse<bool> { Status = false, Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("IsFavorite/{cityName}")]
        public async Task<ActionResult<ServiceResponse<bool>>> IsFavorite(string cityName)
        {
            try
            {
                var userId = GetUserIdFromClaims();
                var result = await _favCityRepo.IsCityFavoriteAsync(userId, cityName);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new ServiceResponse<bool> { Status = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ServiceResponse<bool> { Status = false, Message = $"Internal server error: {ex.Message}" });
            }
        }

        private Guid GetUserIdFromClaims()
        {
            // O ClaimTypes.NameIdentifier contém o ID do usuário (definido no AuthController ao criar o token)
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            return Guid.Parse(userIdClaim);
        }
    }
}
