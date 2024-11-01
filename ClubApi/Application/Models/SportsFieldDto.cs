using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class SportsFieldDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public SportDto Sport { get; set; }

        public static SportsFieldDto Create(SportsField field)
        {
            var dto = new SportsFieldDto();
            dto.Id = field.Id;
            dto.Name = field.Name;
            dto.Sport = SportDto.Create(field.Sport);

            return dto;
        }

        public static List<SportsFieldDto> CreateList(List<SportsField> fields)
        {
            List<SportsFieldDto> listDto = [];
            foreach (var f in fields)
            {
                listDto.Add(Create(f));
            }

            return listDto;
        }
    }
}
