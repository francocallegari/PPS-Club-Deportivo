using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Models.Request
{
    public class UserRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string UserType { get; set; }

        [Required]
        public string DNI { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Direction { get; set; }

        public static bool ValidateDto(UserRequest dto)
        {
            return !string.IsNullOrEmpty(dto.Name) &&
                   !string.IsNullOrEmpty(dto.LastName) &&
                   !string.IsNullOrEmpty(dto.Email) &&
                   !string.IsNullOrEmpty(dto.Password) &&
                   !string.IsNullOrEmpty(dto.UserName) &&
                   !string.IsNullOrEmpty(dto.UserType) &&
                   !string.IsNullOrEmpty(dto.DNI) &&
                   dto.BirthDate != default &&
                   !string.IsNullOrEmpty(dto.PhoneNumber) &&
                   !string.IsNullOrEmpty(dto.Direction);
        }

    }
}
