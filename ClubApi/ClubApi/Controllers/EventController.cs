using Application.Interfaces;
using Application.Models;
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

        [HttpPost]
        public ActionResult<EventDto> CreateEvent([FromBody] EventDto eventDto)
        {
            try
            {
                var existingEvent = _eventService.GetEventByName(eventDto.Name);

                if (existingEvent != null)
                    return BadRequest("El evento ya existe.");

                var createEvent = _eventService.CreateEvent(new Event
                {
                    Name = eventDto.Name,
                    Description = eventDto.Description,
                    Capacity = eventDto.Capacity,
                    Date = eventDto.Date,
                    Status = eventDto.Status,
                    Members = new List<Member>()
                });

                return Ok(EventDto.Create(createEvent));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpDateEvent([FromRoute] int id, [FromBody] EventDto eventDto)
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
    }
}