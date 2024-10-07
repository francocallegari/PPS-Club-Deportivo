using Application.Interfaces;
using Application.Models;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class AutenticacionService : IAuthenticationService
    {
        private readonly IRepositoryUser _userRepository;
        private readonly AutenticacionServiceOptions _options;
        private readonly IEmailService _emailService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AutenticacionService(
            IRepositoryUser userRepository, IOptions<AutenticacionServiceOptions> options,
            IEmailService emailService, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _options        = options.Value;
            _emailService   = emailService;
            _httpContextAccessor = httpContextAccessor;
        }

        private User? ValidateUser(AuthenticationRequest authenticationRequest)
        {
            if (string.IsNullOrEmpty(authenticationRequest.UserName) || string.IsNullOrEmpty(authenticationRequest.Password))
                return null;

            var user = _userRepository.GetUserByName(authenticationRequest.UserName);

            if (user == null)
                return null;

            if (authenticationRequest.UserName == user.UserName && user.Password == authenticationRequest.Password) return user;

            return null;
        }

        public string Autenticar(AuthenticationRequest authenticationRequest)
        {
            var user = ValidateUser(authenticationRequest);

            if (user == null)
                throw new UnauthorizedAccessException("User authentication failed");

            var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey));

            var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            var claimsForToken = new List<Claim>();
            claimsForToken.Add(new Claim("sub", user.Id.ToString()));
            claimsForToken.Add(new Claim("given_name", user.Name));
            claimsForToken.Add(new Claim("email", user.Email));
            claimsForToken.Add(new Claim("role", user.UserType));

            var jwtSecurityToken = new JwtSecurityToken(

              _options.Issuer,
              _options.Audience,
              claimsForToken,
              DateTime.UtcNow,
              DateTime.UtcNow.AddHours(192),
              credentials);

            var tokenToReturn = new JwtSecurityTokenHandler()
                .WriteToken(jwtSecurityToken);

            return tokenToReturn.ToString();
        }

        public class AutenticacionServiceOptions
        {
            public const string AutenticacionService = "AutenticacionService";

            public string Issuer { get; set; }
            public string Audience { get; set; }
            public string SecretForKey { get; set; }
        }

        public class AuthorizeRolesAttribute : AuthorizeAttribute
        {
            public AuthorizeRolesAttribute(params string[] roles) : base()
            {
                Roles = string.Join(",", roles);
            }
        }


        //////////////////////////////////////////////////////////////////////////////////////////
        //Password recovery

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordDto dto)
        {
            var user = _userRepository.GetUserByEmail(dto.Email);
            if (user == null)
                return false;

            var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey));

            var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            var claimsForToken = new List<Claim>();
            claimsForToken.Add(new Claim("email", user.Email));

            var jwtSecurityToken = new JwtSecurityToken(
              _options.Issuer,
              _options.Audience,
              claimsForToken,
              DateTime.UtcNow,
              DateTime.UtcNow.AddHours(192),
              credentials);

            var token = new JwtSecurityTokenHandler()
                .WriteToken(jwtSecurityToken);

            var host = _httpContextAccessor.HttpContext.Request.Host.Value;
            var scheme = _httpContextAccessor.HttpContext.Request.Scheme;
            /*var actionContext = new ActionContext(_httpContextAccessor.HttpContext, new RouteData(), new ActionDescriptor());
            var urlHelper = new UrlHelper(actionContext);*/

            //var callbackUrl = urlHelper.Action("ResetPassword", "Account",
            //    new { token = token, email = user.Email },
            //    scheme);

            /*var callbackUrl2 = urlHelper.Action(
                action: "ResetPassword", // Acción a la que se quiere acceder
                controller: "Autenticacion", // Controlador correspondiente
                values: new
                {
                    area = "api", // Si tienes un área "api", la incluyes aquí
                    token = token, // Incluir el token en los parámetros de la URL
                    email = user.Email // También puedes incluir otros parámetros si los necesitas, como el email
                },
                protocol: scheme,
                host: host
            );*/

            var baseUrl = "http://localhost:5173";
            var uriBuilder = new UriBuilder(baseUrl)
            {
                Path = "api/Autenticacion/ResetPassword",
                Query = $"token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(user.Email)}"
            };

            var callbackUrl = uriBuilder.ToString();
            _emailService.SendForgotPassword(user, callbackUrl);

            return true;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto dto)
        {
            if (dto.Password != dto.Password2)
                return false;

            var user = _userRepository.GetUserByEmail(dto.Email);
            if (user == null)
                return false;

            user.Password = dto.Password;
            _userRepository.UpdateAsync(user);

            return true;
        }
    }
}
