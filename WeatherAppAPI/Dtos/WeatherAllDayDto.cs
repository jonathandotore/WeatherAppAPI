namespace WeatherAppAPI.Dtos
{
    public class WeatherAllDayDto
    {
        public DateTime Date { get; set; }
        public double MinTemperature { get; set; }
        public double MaxTemperature { get; set; }
        public string Condition { get; set; } = string.Empty;
    }
}
