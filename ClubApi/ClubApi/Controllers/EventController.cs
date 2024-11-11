using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [AllowAnonymous]
        [HttpGet("Events")]
        public ActionResult<ICollection<EventDto>> GetAllEvents()
        {
            try
            {
                return Ok(_eventService.GetAllEvents());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("ByName/{name}")]
        public ActionResult<EventDto> GetEventByName(string name)
        {
            try
            {
                var eventDto = _eventService.GetEventByName(name);
                if (eventDto == null)
                    return NotFound("No se encontró un evento con ese nombre.");

                return Ok(eventDto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
        // Se obtienen los socios inscriptos a un evento por el id del evento
        [HttpGet("Members/{id}")]
        public IActionResult GetMembersFromEvent([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole == null || userRole == "Member")
                    return Forbid();

                return Ok(_eventService.GetMembersFromEvent(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public ActionResult<EventDto> CreateEvent([FromBody] EventRequest eventDto, string creatorName)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                    return Forbid();

                return Ok(_eventService.CreateEvent(eventDto, creatorName));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpDateEvent([FromRoute] int id, [FromBody] EventRequest eventDto)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                    return Forbid();

                _eventService.UpdateEvent(id, eventDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin" && userRole != "Director")
                    return Forbid();

                _eventService.DeleteEvent(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPost("SignUpEvent")]
        public IActionResult SignUpEvent(int memberId, int eventId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                _eventService.SignUpEvent(memberId, eventId);
                return Ok("El miembro se ha inscipto correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DropOutEvent")]
        public IActionResult DropOutEvent(int memberId, int eventId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                _eventService.DropOutEvent(memberId, eventId);
                return Ok("El miembro se desinscribió correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("ApproveEvent")]
        public IActionResult ApproveEvent(int directorId, int eventId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Director")
                    return Forbid();

                _eventService.ApproveEvent(directorId, eventId);
                return Ok("El evento fue aprobado correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}