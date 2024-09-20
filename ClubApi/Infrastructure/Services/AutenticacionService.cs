using Application.Interfaces;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class AutenticacionService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly AutenticacionServiceOptions _options;

        public AutenticacionService(IUserRepository userRepository, IOptions<AutenticacionServiceOptions> options)
        {
            _userRepository = userRepository;
            _options = options.Value;
        }

        private User? ValidateUser(AuthenticationRequest authenticationRequest)
        {
            if (string.IsNullOrEmpty(authenticationRequest.UserName) || string.IsNullOrEmpty(authenticationRequest.Password))
                return null;

            var user = _userRepository.GetUserByUserName(authenticationRequest.UserName);

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
    }
}
