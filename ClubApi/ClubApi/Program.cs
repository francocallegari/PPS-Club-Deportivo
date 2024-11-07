using Application.Interfaces;
using Application.Models;
using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using MercadoPago.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
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

// Configuración de autenticación y JWT
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["AutenticacionService:Issuer"],
            ValidAudience = builder.Configuration["AutenticacionService:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["AutenticacionService:SecretForKey"]))
        };
    }
);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", corsBuilder =>
    {
        corsBuilder.WithOrigins("http://localhost:5173", "https://localhost:7062")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
    });
});

// Configuración de DbContext
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlite(
    builder.Configuration["ConnectionStrings:ClubDBConnectionString"],
    b => b.MigrationsAssembly("Infrastructure"))
);




// Configuración de Mercado Pago
MercadoPagoConfig.AccessToken = builder.Configuration["MercadoPago:AccessToken"];

// Configuración de templates de email
builder.Services.Configure<EmailTemplateSettings>(builder.Configuration.GetSection("EmailTemplates"));

// Configuración de repositorios
builder.Services.AddScoped<IRepositoryUser, RepositoryUser>();
builder.Services.AddScoped<IRepositoryEvent, RepositoryEvent>();
builder.Services.AddScoped<IRepositorySport, RepositorySport>();
builder.Services.AddScoped<IRepositoryNews, RepositoryNews>();
builder.Services.AddScoped<IRepositoryTrainingSession, RepositoryTrainingSession>();
builder.Services.AddScoped<IRepositoryCoach, RepositoryCoach>();
builder.Services.AddScoped<IRepositoryBase<SportsField>, EfRepository<SportsField>>();
builder.Services.AddScoped<IRepositoryBase<Sport>, EfRepository<Sport>>();
builder.Services.AddScoped<IRepositoryBase<MembershipFee>, EfRepository<MembershipFee>>();
builder.Services.AddScoped<IRepositoryStatistics, RepositoryStatistics>();


// Configuración de servicios de aplicación
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<ISportsService, SportsService>();
builder.Services.AddScoped<ITSessionService, TSessionService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<MercadoPagoService>();
builder.Services.AddScoped<INewsService, NewsService>();
// builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();

// Configuración de autenticación personalizada
builder.Services.Configure<AutenticacionService.AutenticacionServiceOptions>(
    builder.Configuration.GetSection(AutenticacionService.AutenticacionServiceOptions.AutenticacionService)
);
builder.Services.AddScoped<IAuthenticationService, AutenticacionService>();

// Construcción de la aplicación
var app = builder.Build();

// Configuración del middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
