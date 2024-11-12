using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberTrainingSessionController : ControllerBase
    {
        private readonly IMemberTrainingSessionService _service;

        public MemberTrainingSessionController(IMemberTrainingSessionService service)
        {
            _service = service;
        }

        // GET api/MemberTrainingSession/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            // Intentar obtener la sesión de entrenamiento por ID
            var memberTrainingSessions = await _service.GetByMemberId(id);

            // Si no se encuentra ninguna sesión, devolver 404
            if (memberTrainingSessions == null || !memberTrainingSessions.Any())
            {
                return NotFound($"No se encontraron sesiones de entrenamiento para el miembro con ID {id}");
            }

            // Si se encuentra, devolver las sesiones de entrenamiento
            return Ok(memberTrainingSessions);
        }
    }
}