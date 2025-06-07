namespace WeatherAppAPI.Dtos
{
    public class CurrentWeatherDto
    {
        public string CityName { get; set; } = string.Empty;
        public double Temperature { get; set; }
        public double MinTemperature { get; set; }
        public double MaxTemperature { get; set; }
        public string Condition { get; set; } = string.Empty;
        public int Humidity { get; set; }
        public string Icon { get; set; } = string.Empty;
    }
}
    