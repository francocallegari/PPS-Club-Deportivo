using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Models;

namespace ClubApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly MercadoPagoService _mercadoPagoService;

        public PaymentController(MercadoPagoService mercadoPagoService)
        {
            _mercadoPagoService = mercadoPagoService;
        }

        [HttpPost("create-preference")]
        public async Task<IActionResult> CreatePreference([FromBody] PaymentRequestDto request)
        {
            // Crear preferencia a través del servicio de MercadoPago
            var preference = await _mercadoPagoService.CrearPreferenciaAsync(request);

            if (preference == null)
                return BadRequest("No se pudo crear la preferencia");

            // Devolver el ID de la preferencia
            return Ok(new { id = preference.Id });
        }
    }

}