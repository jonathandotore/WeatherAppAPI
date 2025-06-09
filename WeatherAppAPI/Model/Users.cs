using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherAppAPI.Model
{
    [Table("User")]
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        public byte[] PasswordHash { get; set; } = new byte[0]; 
        public byte[] PasswordSalt { get; set; } = new byte[0];
        public string Role { get; set; } = "User";
    }
}
