namespace WeatherAppAPI.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
    }
}
