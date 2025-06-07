using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherAppAPI.Model
{
    [Table("FavoriteCity")]
    public class FavoriteCity
    {
        [Key]
        public Guid CityId { get; set; }

        [Required]
        public string CityName { get; set; } = string.Empty;

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        #region CONSTRUTCOR
        public FavoriteCity()
        {
            Guid guid = Guid.NewGuid();
        }
        #endregion
    }
}
