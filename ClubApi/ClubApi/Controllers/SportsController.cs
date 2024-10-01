using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsController : ControllerBase
    {
        private readonly ISportsService _sportsService;

        public SportsController(ISportsService sportsService)
        {
            _sportsService = sportsService;
        }

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

        [HttpGet("Members/{id}")]
        public ActionResult<List<MemberDto>> GetAllMembers([FromRoute] int id)
        {
            try
            {
                return Ok(_sportsService.GetAllMembers(id));
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
                _sportsService.DeleteSport(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
    }
}
