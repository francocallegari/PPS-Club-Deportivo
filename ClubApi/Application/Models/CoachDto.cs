using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class CoachDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public SportDto Sport { get; set; }

        public static CoachDto Create(Coach coach)
        {
            var dto = new CoachDto();
            dto.Id = coach.Id;
            dto.UserName = coach.UserName;
            dto.Name = coach.Name;
            dto.Email = coach.Email;
            dto.Sport = SportDto.Create(coach.SportAssigned);

            return dto;

        }

        public static List<CoachDto> CreateList(List<Coach> coaches)
        {
            List<CoachDto> listDto = [];
            foreach (var c in coaches)
            {
                listDto.Add(Create(c));
            }

            return listDto;
        }
    }
}
