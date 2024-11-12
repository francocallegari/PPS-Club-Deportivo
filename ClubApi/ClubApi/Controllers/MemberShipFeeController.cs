using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Application.Models.Request;
using Application.Services;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MemberShipFeeController : ControllerBase
    {
        private readonly IPaymentService _paymentService; 
        private readonly IMembershipFeeService _membershipFeeService;
        public MemberShipFeeController(IPaymentService paymentService, IMembershipFeeService membershipFeeService) {
            _paymentService = paymentService;
            _membershipFeeService = membershipFeeService;
        }

        [AllowAnonymous]
        [HttpGet("CurrentRatePrice")] //valor de la cuota actual
        public IActionResult GetCurrentRatePrice()
        {
            try
            {
                var currentRatePrice = _paymentService.GetCurrentRatePrice();
                return Ok(currentRatePrice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("MemberFees/{memberId}")] //cuotas pagadas o no pagadas de un miembro
        public IActionResult GetMemberFees(int memberId, [FromQuery] FeeStatus? status = null)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin" && userRole != "Member")
                    return Forbid();

                var feePaymentsDto = _paymentService.GetMemberFees(memberId, status);
                return Ok(feePaymentsDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("UpdatePrice")]
        public IActionResult UpdatePrice([FromQuery] float feePrice)
        {
            try
            {
                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole != "Admin")
                    return Forbid();

                _membershipFeeService.UpdateFeesPrice(feePrice);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult ConfirmPayment([FromRoute] int id)
        {
            try
            {
                _membershipFeeService.UpdateFeeStatus(id);
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
