using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Domain.Enums;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberShipFeeController : ControllerBase
    {
        private readonly IPaymentService _paymentService; 
        private readonly IMembershipFeeService _membershipFeeService;
        public MemberShipFeeController(IPaymentService paymentService, IMembershipFeeService membershipFeeService) {
            _paymentService = paymentService;
            _membershipFeeService = membershipFeeService;
        }

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
                _membershipFeeService.UpdateFeesPrice(feePrice);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }





    }
}
