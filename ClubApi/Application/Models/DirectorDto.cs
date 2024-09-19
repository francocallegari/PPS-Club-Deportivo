using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class DirectorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        public static DirectorDto Create(Director director)
        {
            var dto = new DirectorDto();
            dto.Id = director.Id;
            dto.UserName = director.UserName;
            dto.Name = director.Name;
            dto.Email = director.Email;

            return dto;

        }

        public static List<DirectorDto> CreateList(List<Director> directors)
        {
            List<DirectorDto> listDto = [];
            foreach (var d in directors)
            {
                listDto.Add(Create(d));
            }

            return listDto;
        }
    }
}
