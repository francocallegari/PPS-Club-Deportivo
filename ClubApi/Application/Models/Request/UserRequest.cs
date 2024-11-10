using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Application.Models.Request
{
    public class UserRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string UserType { get; set; }
        public string PhoneNumber { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string Dni { get; set; }

        public string Address { get; set; }

        public int? SportId { get; set; }

        public static User ToEntity(UserRequest dto)
        {
            return new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
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

        public static bool validateDto(UserRequest dto)
        {
            if (dto.Name == default ||
                dto.Email == default ||
                dto.Password == default ||
                dto.UserName == default)
                return false;

            return true;
        }
    }
}
