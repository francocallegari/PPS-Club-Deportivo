using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class AdminDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        public static AdminDto Create(Admin admin)
        {
            var dto = new AdminDto();
            dto.Id = admin.Id;
            dto.UserName = admin.UserName;
            dto.Name = admin.Name;
            dto.Email = admin.Email;

            return dto;

        }

        public static List<AdminDto> CreateList(List<Admin> admins)
        {
            List<AdminDto> listDto = [];
            foreach (var a in admins)
            {
                listDto.Add(Create(a));
            }

            return listDto;
        }
    }
}
