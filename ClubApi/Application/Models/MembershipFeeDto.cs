using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class MembershipFeeDto
    {
        public int Id { get; set; }
        public float Price { get; set; }
        public DateTime ExpirationDate { get; set; }
        public FeeStatus Status { get; set; }
        public static MembershipFeeDto Create(MembershipFee fee)
        {
            var dto = new MembershipFeeDto();
            dto.Id = fee.Id;
            dto.Price = fee.Price;
            dto.ExpirationDate = fee.ExpirationDate;
            dto.Status = fee.Status;

            return dto;

        }

        public static List<MembershipFeeDto> CreateList(List<MembershipFee> fees)
        {
            List<MembershipFeeDto> listDto = [];
            foreach (var f in fees)
            {
                listDto.Add(Create(f));
            }

            return listDto;
        }
    }
}
