using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setupAction =>
{
    setupAction.AddSecurityDefinition("clubApiBearerAuth", new OpenApiSecurityScheme()
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Acá pegar el token generado al loguearse."
    });

    setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "clubApiBearerAuth" }
                }, new List<string>() }
    });
});

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer =           true,
            ValidateAudience =         true,  
            ValidateIssuerSigningKey = true,
            ValidIssuer =              builder.Configuration["AutenticacionService:Issuer"],
            ValidAudience =            builder.Configuration["AutenticacionService:Audience"],
            IssuerSigningKey =         new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["AutenticacionService:SecretForKey"]))
        };
    }
);

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
builder.Services.AddScoped<IRepositoryBase<Sport>, EfRepository<Sport>>();

#region services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<ISportsService, SportsService>();

builder.Services.AddScoped<IEmailService, EmailService>();
#endregion

builder.Services.Configure<AutenticacionService.AutenticacionServiceOptions>(
    builder.Configuration.GetSection(AutenticacionService.AutenticacionServiceOptions.AutenticacionService));
builder.Services.AddScoped<IAuthenticationService, AutenticacionService>();

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
