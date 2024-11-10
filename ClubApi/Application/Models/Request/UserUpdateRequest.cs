using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Request
{
    public class UserUpdateRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string UserType { get; set; }
        public string PhoneNumber { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string Dni { get; set; }

        public string Address { get; set; }

        public static User ToEntity(UserUpdateRequest dto)
        {
            return new User
            {
                Name = dto.Name,
                Email = dto.Email,
                UserName = dto.UserName,
                UserType = dto.UserType,
                UserRegistrationDate = DateTime.Now,
                UserDeletionDate = null,
                PhoneNumber = dto.PhoneNumber,
                DateOfBirth = dto.DateOfBirth,
                Dni = dto.Dni,
                Address = dto.Address,
            };
        }

        public static bool validateDto(UserUpdateRequest dto)
        {
            if (dto.Name == default ||
                dto.Email == default ||
                dto.UserName == default)
                return false;

            return true;
        }
    }
}
