using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<ICollection<UserResponse>> GetAllUsers()
        {
            try
            {
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

        [HttpPost]
        public ActionResult<UserResponse> CreateUser([FromBody] UserRequest user)
        {
            try
            {
                if (!UserRequest.ValidateDto(user))
                    return BadRequest("La solicitud no es válida. Verifica que todos los campos requeridos estén presentes y contengan valores adecuados.");

                var existingUser = _userService.GetUserByUserName(user.UserName);

                if (existingUser != null)
                    return BadRequest("El usuario ya existe.");

                var createdUser = _userService.CreateUser(user);
                return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserRequest user)
        {
            try
            {
                if (!UserRequest.ValidateDto(user))
                    return BadRequest("La solicitud no es válida. Verifica que todos los campos requeridos estén presentes y contengan valores adecuados.");

                _userService.UpdateUser(id, user);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {
            try
            {
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
    }
}
