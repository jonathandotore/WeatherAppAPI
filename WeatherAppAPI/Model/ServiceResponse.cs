namespace WeatherAppAPI.Model
{
    public class ServiceResponse<T>
    {
        public T? Data { get; set; } 
        public string? Message { get; set; } = string.Empty;
        public bool Status { get; set; } = false;
    }
}
