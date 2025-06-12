using Newtonsoft.Json;

namespace WeatherAppAPI.Model
{
    public class OpenWeatherResponse
    {
        #region AllDaysResponse
        public class ForecastRoot
        {

            [JsonProperty("list")]
            public List<WeatherForecast> List { get; set; }
        }

        public class WeatherForecast
        {
            [JsonProperty("dt_txt")]
            public string DtTxt { get; set; }

            [JsonProperty("main")]
            public MainForecast MainForecast { get; set; } = new();

            [JsonProperty("weather")]
            public List<ForecastWeather> Weather { get; set; } = new();
        }

        public class MainForecast
        {
            [JsonProperty("temp_min")]
            public double MinTemperature { get; set; }

            [JsonProperty("temp_max")]
            public double MaxTemperature { get; set; }
        }

        public class ForecastWeather
        {
            [JsonProperty("description")]
            public string Description { get; set; } = string.Empty;

            [JsonProperty("main")]
            public string Main { get; set; } = string.Empty;

            [JsonProperty("icon")]
            public string Icon { get; set; } = string.Empty;
        }
        #endregion
    }
}
