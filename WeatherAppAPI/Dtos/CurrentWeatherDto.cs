namespace WeatherAppAPI.Dtos
{
    public class CurrentWeatherDto
    {
        public string CityName { get; set; }
        public float Temperature { get; set; }
        public float MinTemperature { get; set; }
        public float MaxTemperature { get; set; }
        public string Condition { get; set; }
        public int Humidity { get; set; }
    }
}
    