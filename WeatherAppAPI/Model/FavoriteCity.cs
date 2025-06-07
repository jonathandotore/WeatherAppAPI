namespace WeatherAppAPI.Model
{
    public class FavoriteCity
    {
        public Guid CityId { get; set; }
        public string CityName { get; set; } = string.Empty;
        public User UserId { get; set; }

        public FavoriteCity()
        {
            Guid guid = Guid.NewGuid();
        }
    }
}
