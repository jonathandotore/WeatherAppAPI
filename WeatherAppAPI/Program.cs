using Microsoft.EntityFrameworkCore;
using WeatherAppAPI.Data;
using WeatherAppAPI.Interfaces;
using WeatherAppAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);


// DB
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Injeção de dependência
builder.Services.AddScoped<IFavoriteCityRepository, FavoriteCityRepository>();

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

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
