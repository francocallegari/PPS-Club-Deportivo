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
            builder.WithOrigins("http://localhost:5173", "https://localhost:7062")
                   .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlite(
builder.Configuration["ConnectionStrings:ClubDBConnectionString"], b => b.MigrationsAssembly("Infrastructure")));

// Configuración de Mercado Pago
MercadoPagoConfig.AccessToken = builder.Configuration["MercadoPago:AccessToken"];

// Configuración de los templates para envio de mails
builder.Services.Configure<EmailTemplateSettings>(builder.Configuration.GetSection("EmailTemplates"));

//Repository
builder.Services.AddScoped<IRepositoryUser, RepositoryUser>();
builder.Services.AddScoped<IRepositoryEvent, RepositoryEvent>();
builder.Services.AddScoped<IRepositorySport, RepositorySport>();
builder.Services.AddScoped<IRepositoryNews, RepositoryNews>();
builder.Services.AddScoped<IRepositoryTrainingSession, RepositoryTrainingSession>();
builder.Services.AddScoped<IRepositoryCoach, RepositoryCoach>();
builder.Services.AddScoped<IRepositoryBase<SportsField>, EfRepository<SportsField>>();
builder.Services.AddScoped<IRepositoryBase<Sport>, EfRepository<Sport>>();
builder.Services.AddScoped<IRepositoryField, RepositoryField>();
builder.Services.AddScoped<IRepositoryMembershipFee, RepositoryMembershipFee>();

builder.Services.AddScoped<IRepositoryPayment, RepositoryPayment>();
builder.Services.AddScoped<IRepositoryBase<MembershipFee>, EfRepository<MembershipFee>>();  


builder.Services.AddScoped<IRepositoryStatistics, RepositoryStatistics>();



#region services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<ISportsService, SportsService>();
builder.Services.AddScoped<ITSessionService, TSessionService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<MercadoPagoService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IFieldService, FieldService>();
builder.Services.AddScoped<IMembershipFeeService, MembershipFeeService>();

builder.Services.AddScoped<IStatisticsService, StatisticsService>();

builder.Services.AddHostedService<MembershipFeeHostedService>();

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
