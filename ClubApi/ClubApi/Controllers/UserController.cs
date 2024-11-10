using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Models.Response;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMemberService _memberService;

        public UserController(IUserService userService, IMemberService memberService)
        {
            _userService = userService;
            _memberService = memberService;
        }

        [HttpGet]
        public ActionResult<ICollection<UserResponse>> GetAllUsers()
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin" && userRole != "Director")
                    return Forbid();

                return Ok(_userService.GetAllUsers());
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid("Acceso denegado. No tiene los permisos necesarios.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<UserResponse> GetById([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole == null)
                    return Forbid();

                return Ok(_userService.GetUserById(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid("Acceso denegado. No tiene los permisos necesarios.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("ValidateExistingUser")]
        public IActionResult GetByUserName([FromQuery] string userName)
        {
            var existingUser = _userService.GetUserByUserName(userName);
            if (existingUser == null)
            {
                return Ok();
            } else
            {
                return BadRequest("El usuario ya existe");
            }
        }

        [HttpGet("MemberById/{id}")]
        public ActionResult<UserResponse> GetMemberById([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole == null)
                    return Forbid();

                return Ok(_memberService.GetMemberById(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid("Acceso denegado. No tiene los permisos necesarios.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        /* [HttpPost("newUser")]
        public ActionResult<UserResponse> CreateUser([FromBody] UserRequest user)
        {
            try
            {
                if (!UserRequest.validateDto(user))
                    return BadRequest("La solicitud no es válida." +
                        " Verifica que todos los campos requeridos estén presentes y contengan valores adecuados.");

                return Ok(_userService.CreateUser(user));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }*/

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserUpdateRequest user)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole == null)
                    return Forbid();

                if (!UserUpdateRequest.validateDto(user))
                    return BadRequest("La solicitud no es válida." +
                        " Verifica que todos los campos requeridos estén presentes y contengan valores adecuados.");

                _userService.UpdateUser(id, user);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPut("MemberUpDate/{id}")]
        public IActionResult UpdateMember([FromRoute] int id, [FromBody] MemberDto memberDto)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                _memberService.UpDateMember(id, memberDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin" && userRole != "Director")
                    return Forbid();

                _userService.DeleteUser(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid("Acceso denegado. No tiene los permisos necesarios.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("registerUser")]
        public ActionResult<UserResponse> RegisterUser([FromBody] UserRequest user)
        {
            try
            {
                if (!UserRequest.validateDto(user))
                    return BadRequest("La solicitud no es válida." +
                        " Verifica que todos los campos requeridos estén presentes y contengan valores adecuados.");

                return Ok(_userService.RegisterUser(user));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
    }
}
