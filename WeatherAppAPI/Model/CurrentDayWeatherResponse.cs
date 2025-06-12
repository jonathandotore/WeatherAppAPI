using Newtonsoft.Json;

namespace WeatherAppAPI.Model
{
    public class CurrentDayWeatherResponse
    {
        #region CurrentCityResponse

        public class WeatherResponse
        {
            [JsonProperty("id")]
            public int Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; } = string.Empty;

            [JsonProperty("main")]
            public MainWeather Main { get; set; } = new();

            [JsonProperty("wind")]
            public WindDescriptions Wind { get; set; } = new();

            [JsonProperty("weather")]
            public List<WeatherDescription> Weather { get; set; } = new();

        }

        public class MainWeather
        {
            [JsonProperty("temp")]
            public double Temp { get; set; }

            [JsonProperty("feels_like")]
            public double FeelsLike { get; set; }

            [JsonProperty("temp_min")]
            public double TempMin { get; set; }

            [JsonProperty("temp_max")]
            public double TempMax { get; set; }

            [JsonProperty("pressure")]
            public int Pressure{ get; set; }

            [JsonProperty("humidity")]
            public int Humidity { get; set; }
        }

        public class WeatherDescription
        {
            [JsonProperty("description")]
            public string Description { get; set; } = string.Empty;

            [JsonProperty("icon")]
            public string Icon { get; set; } = string.Empty;
        }

        public class WindDescriptions
        {
            [JsonProperty("speed")]
            public double Speed { get; set; }

        }

        #endregion
    }
}
