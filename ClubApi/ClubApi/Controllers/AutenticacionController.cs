using Application.Interfaces;
using Application.Models;
using Application.Models.Requests;
using Microsoft.AspNetCore.Authorization;
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
            try
            {
                string token = _customAuthenticationService.Autenticar(authenticationRequest);

                return Ok(token);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
            
        }

        [HttpPost("ForgotPassword")]
        public ActionResult ForgotPassword(ForgotPasswordDto model)
        {
            var result = _customAuthenticationService.ForgotPasswordAsync(model);
            if (result.IsCompletedSuccessfully)
            {
                return Ok("Se ha enviado un correo con las instrucciones para restablecer la contraseña.");
            }
            return BadRequest(result);
        }

        [HttpPost("ResetPassword")]
        [Authorize]
        public ActionResult ResetPassword(ResetPasswordDto model)
        {
            var result = _customAuthenticationService.ResetPassword(model);
            if (result.IsCompletedSuccessfully)
            {
                return Ok("La contraseña se ha restablecido correctamente.");
            }
            return BadRequest(result);
        }
    }
}
