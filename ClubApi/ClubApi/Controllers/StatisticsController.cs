using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("Statistics/PopularSports")]
        public ActionResult<ICollection<PopularSportDto>> GetPopularSports()
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Director")
                    return Forbid();

                return Ok(_statisticsService.GetPopularSports());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpGet("Statistics/NewUsers")]
        public ActionResult<ICollection<NewUsersDto>> GetNewUsersPerMonth()
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Director")
                    return Forbid();

                return Ok(_statisticsService.GetNewUsers());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpGet("Statistics/PaymentStatus")]
        public ActionResult<ICollection<PaymentStatusDto>> GetPaymentStatus()
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Director")
                    return Forbid();

                return Ok(_statisticsService.GetPaymentStatus());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
    }
}
