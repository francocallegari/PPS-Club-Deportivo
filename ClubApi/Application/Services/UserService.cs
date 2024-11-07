using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;
using System.Collections.Generic;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryUser _repositoryUser;

        public UserService(IRepositoryUser repositoryUser)
        {
            _repositoryUser = repositoryUser;
        }

        public UserDto CreateUser(UserRequest request)
        {
            var user = new User
            {
                Name = request.Name,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                UserName = request.UserName,
                UserType = request.UserType,
                DNI = request.DNI,
                BirthDate = request.BirthDate,
                PhoneNumber = request.PhoneNumber,
                Direction = request.Direction,
                UserRegistrationDate = DateTime.Now
            };

            _repositoryUser.AddAsync(user);
            return UserDto.Create(user);
        }

        public List<UserDto> GetAllUsers()
        {
            var users = _repositoryUser.ListAsync().Result;
            return users.ConvertAll(UserDto.Create);
        }

        public UserDto GetUserById(int id)
        {
            var user = _repositoryUser.GetByIdAsync(id).Result;
            if (user == null) throw new KeyNotFoundException("Usuario no encontrado.");
            return UserDto.Create(user);
        }

        public void UpdateUser(int id, UserRequest request)
        {
            var user = _repositoryUser.GetByIdAsync(id).Result;
            if (user == null) throw new KeyNotFoundException("Usuario no encontrado.");

            user.Name = request.Name;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.Password = request.Password;
            user.UserName = request.UserName;
            user.UserType = request.UserType;
            user.DNI = request.DNI;
            user.BirthDate = request.BirthDate;
            user.PhoneNumber = request.PhoneNumber;
            user.Direction= request.Direction;

            _repositoryUser.UpdateAsync(user);
        }

        public void DeleteUser(int id)
        {
            var user = _repositoryUser.GetByIdAsync(id).Result;
            if (user == null) throw new KeyNotFoundException("Usuario no encontrado.");

            _repositoryUser.DeleteAsync(user);
        }

        ICollection<UserResponse> IUserService.GetAllUsers()
        {
            throw new NotImplementedException();
        }

        UserResponse IUserService.GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public User GetUserByUserName(string userName)
        {
            throw new NotImplementedException();
        }

        UserResponse IUserService.CreateUser(UserRequest user)
        {
            throw new NotImplementedException();
        }
    }
}
