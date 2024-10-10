using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
