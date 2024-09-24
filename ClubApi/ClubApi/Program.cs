using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlite(
builder.Configuration["ConnectionStrings:ClubDBConnectionString"], b => b.MigrationsAssembly("Infrastructure")));

//Repository
builder.Services.AddScoped<IRepositoryUser, RepositoryUser>();
builder.Services.AddScoped<IRepositoryEvent, RepositoryEvent>();
builder.Services.AddScoped<IRepositorySport, RepositorySport>();
builder.Services.AddScoped<IRepositoryNews, RepositoryNews>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
