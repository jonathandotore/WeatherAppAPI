using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WeatherAppAPI.Data;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Repositories;
using WeatherAppAPI.Services;

var builder = WebApplication.CreateBuilder(args);


// DB
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Auth JWT
var jwtSecret = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtSecret))
    throw new ArgumentNullException("JWT Key not found in configuration. Please add 'Jwt:Key' to appsettings.json.");

var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, 
        ValidateAudience = false,
        ValidateLifetime = true, 
        ClockSkew = TimeSpan.Zero 
    };
});

// Injeção de dependência
builder.Services.AddScoped<IFavoriteCityRepository, FavoriteCityRepository>();
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddHttpClient<IWeatherService, WeatherService>();

// CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("FullyPermissiveCorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FullyPermissiveCorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
