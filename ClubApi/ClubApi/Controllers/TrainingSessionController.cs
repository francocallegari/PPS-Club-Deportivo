using Application.Interfaces;
using Application.Models.Request;
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
    public class TrainingSessionController : ControllerBase
    {
        private readonly ITSessionService _sessionService;
        public TrainingSessionController(ITSessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [AllowAnonymous]
        [HttpGet("Sessions")]
        public IActionResult GetAll()
        {
            return Ok(_sessionService.GetAllSessions());
        }
        [HttpGet("SessionsByCoachId")]
        public IActionResult GetAllByCoachId([FromQuery] int coachId) 
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Coach")
                    return Forbid();

                return Ok(_sessionService.GetTSbyCoachId(coachId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("SessionsByMemberId")]
        public IActionResult GetAllByMemberId([FromQuery] int memberId)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Member")
                    return Forbid();

                return Ok(_sessionService.GetAllByMemberId(memberId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("SessionsBySportId/{id}")]
        public IActionResult GetAllBySportId([FromRoute] int id)
        {
            try
            {
                return Ok(_sessionService.GetAllBySportId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult CreateSession([FromBody] TSessionRequest session)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Coach")
                    return Forbid();

                return Ok(_sessionService.CreateTS(session));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public IActionResult UpdateSession([FromRoute] int id, [FromBody] TSessionRequest session)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Coach")
                    return Forbid();

                _sessionService.UpdateTS(id, session);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteSession([FromRoute] int id)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Coach")
                    return Forbid();

                _sessionService.DeleteTS(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
