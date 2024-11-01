using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }

        public static UserDto Create(User user)
        {
            var dto = new UserDto();
            dto.Id = user.Id;
            dto.UserName = user.UserName;
            dto.Name = user.Name;
            dto.Email = user.Email;
            dto.PhoneNumber = user.PhoneNumber;

            return dto;

        }

        public static List<UserDto> CreateList(List<User> users)
        {
            List<UserDto> listDto = [];
            foreach (var u in users)
            {
                listDto.Add(Create(u));
            }

            return listDto;
        }
    }
}
