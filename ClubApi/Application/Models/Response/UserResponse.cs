﻿using Domain.Entities;
using static Domain.Enums.Enums;

namespace Application.Models.Response
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public UserType UserType { get; set; }
        public DateTime UserRegistrationDate { get; set; }
        public DateTime? UserDeletionDate { get; set; }

        public static UserResponse ToDto(User user)
        {
            return new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                UserName = user.UserName,
                UserType = user.UserType,
                UserRegistrationDate = user.UserRegistrationDate,
                UserDeletionDate = user.UserDeletionDate
            };
        }

        public static ICollection<UserResponse> ToDtoList(IEnumerable<User> users)
        {
            return users.Select(user => new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                UserName = user.UserName,
                UserType = user.UserType,
                UserRegistrationDate = user.UserRegistrationDate,
                UserDeletionDate = user.UserDeletionDate
            }).ToList();
        }
    }
}
