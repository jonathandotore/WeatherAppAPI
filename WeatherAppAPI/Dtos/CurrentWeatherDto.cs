namespace WeatherAppAPI.Dtos
{
    public class CurrentWeatherDto
    {
        public int Id { get; set; }
        public string CityName { get; set; } = string.Empty;
        public double Temperature { get; set; }
        public double MinTemperature { get; set; }
        public double MaxTemperature { get; set; }
        public int Pressure { get; set; }
        public string Condition { get; set; } = string.Empty;
        public int Humidity { get; set; }
        public double Feels_like { get; set; }
        public string Icon { get; set; } = string.Empty;
        public double Wind { get; set; }
    }
}
    