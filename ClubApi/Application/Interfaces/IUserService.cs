using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserService
    {
        ICollection<UserResponse> GetAllUsers();
        UserResponse GetUserById(int id);
        User GetUserByUserName(string userName);
        void UpdateUser(int id, UserRequest customer);
        void DeleteUser(int id);
        UserResponse CreateUser(UserRequest user);
        UserResponse RegisterUser(UserRequest user);
    }
}
