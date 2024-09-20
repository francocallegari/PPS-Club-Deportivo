using Application.Interfaces;
using Application.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthenticationService _customAuthenticationService;

        public AutenticacionController(IConfiguration config, IAuthenticationService autenticacionService)
        {
            _config = config;
            _customAuthenticationService = autenticacionService;
        }

        [HttpPost("authenticate")]
        public ActionResult<string> Autenticar(AuthenticationRequest authenticationRequest)
        {
            string token = _customAuthenticationService.Autenticar(authenticationRequest);

            return Ok(token);
        }
    }
}
