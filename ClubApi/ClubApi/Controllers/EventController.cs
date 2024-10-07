using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

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
                _eventService.SignUpEvent(memberId, eventId);
                return Ok("El miembro se ha inscipto correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}