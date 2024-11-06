using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        private readonly IFieldService _fieldService;
        public FieldController(IFieldService fieldService)
        {
            _fieldService = fieldService;
        }
        [HttpGet("FieldsBySportId")]
        public IActionResult GetBySportId([FromQuery] int sportId) 
        {
            try
            {
                return Ok(_fieldService.GetBySportId(sportId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
