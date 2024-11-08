using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class MemberShipFeePaymentDto
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int FeeId { get; set; }
        public FeeStatus Status { get; set; }
        public DateTime? PaymentDate { get; set; }
        public float FeePrice { get; set; }


        public static MemberShipFeePaymentDto Create(MembershipFeePayment fee)
        {
            var dto = new MemberShipFeePaymentDto();
            dto.Id = fee.Id;
            dto.MemberId = fee.MemberId;
            dto.FeeId = fee.FeeId;
            dto.Status = fee.Status;
            dto.PaymentDate = fee.PaymentDate;
            dto.FeePrice = fee.Price;

            return dto;

        }

        public static List<MemberShipFeePaymentDto> CreateList(List<MembershipFeePayment> fees)
        {
            var listDto = new List<MemberShipFeePaymentDto>();
            foreach (var fee in fees)
            {
                listDto.Add(Create(fee));
            }

            return listDto;
        }
    }
}
