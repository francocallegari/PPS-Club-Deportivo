using Domain.Entities;
using System;

namespace Application.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public string DNI { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Direction { get; set; }
        public DateTime UserRegistrationDate { get; set; }
        public DateTime? UserDeletionDate { get; set; }

        public static UserDto Create(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                UserType = user.UserType,
                DNI = user.DNI,
                BirthDate = user.BirthDate,
                PhoneNumber = user.PhoneNumber,
                Direction = user.Direction,
                UserRegistrationDate = user.UserRegistrationDate,
                UserDeletionDate = user.UserDeletionDate
            };
        }
    }
}
