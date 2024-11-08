using Domain.Entities;

namespace Application.Models.Response
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public DateTime UserRegistrationDate { get; set; }
        public DateTime? UserDeletionDate { get; set; }
        public string PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Dni { get; set; }
        public string Address { get; set; }

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
                UserDeletionDate = user.UserDeletionDate,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Dni = user.Dni,
                Address = user.Address
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
                UserDeletionDate = user.UserDeletionDate,
                PhoneNumber = user.PhoneNumber
            }).ToList();
        }
    }
}
