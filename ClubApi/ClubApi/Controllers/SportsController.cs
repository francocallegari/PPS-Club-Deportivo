using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SportsController : ControllerBase
    {
        private readonly ISportsService _sportsService;

        public SportsController(ISportsService sportsService)
        {
            _sportsService = sportsService;
        }

        [AllowAnonymous]
        [HttpGet("sports")]
        public ActionResult<ICollection<SportDto>> GetAllSports()
        {
            try
            {
                return Ok(_sportsService.GetAllSports());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("{name}")]
        public ActionResult<SportDto> GetSportByName(string name)
        {
            try
            {
                return Ok(_sportsService.GetSportByName(name));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpGet("GetMembers/{id}")]
        public ActionResult<List<MemberDto>> GetAllMembers([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin" && userRole != "Coach")
                    return Forbid();

                return Ok(_sportsService.GetAllMembers(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
        [HttpGet("SportByCoachId/{id}")]
        public IActionResult GetByCoachId([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Coach")
                    return Forbid();

                return Ok(_sportsService.GetByCoachId(id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<SportDto> CreateSport([FromBody] SportDto sport)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                    return Forbid();

                var existingSport = _sportsService.GetSportByName(sport.Name);

                if (existingSport != null)
                    return BadRequest("El deporte ya existe.");

                return Ok(_sportsService.CreateSport(sport));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateSport([FromRoute] int id, [FromBody] SportDto sport)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                    return Forbid();

                _sportsService.UpdateSport(id, sport);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSport([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                    return Forbid();

                _sportsService.DeleteSport(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
        [HttpPost("SignUpSport")]
        public IActionResult SignUpSport([FromQuery] int memberId, [FromQuery] int sportId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                _sportsService.SignUpSport(sportId, memberId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DropOutSport")]
        public IActionResult DropOutSport([FromQuery] int memberId, [FromQuery] int sportId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                _sportsService.DropOutSport(sportId, memberId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SignUpSportSession")]
        public IActionResult SignUpSportSession([FromQuery] int memberId, [FromQuery] int sessionId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                _sportsService.SignUpSportSession(sessionId, memberId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
