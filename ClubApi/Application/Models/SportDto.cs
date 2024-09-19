using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class SportDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public List<MemberDto> Members { get; set; }

        public static SportDto Create(Sport sport)
        {
            var dto = new SportDto();
            dto.Id = sport.Id;
            dto.Name = sport.Name;
            dto.Capacity = sport.Capacity;
            dto.Members = MemberDto.CreateList(sport.Members);

            return dto;

        }

        public static List<SportDto> CreateList(List<Sport> sports)
        {
            List<SportDto> listDto = [];
            foreach (var s in sports)
            {
                listDto.Add(Create(s));
            }

            return listDto;
        }
    }
}
