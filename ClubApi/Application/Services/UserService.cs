using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryUser _userRepository;
        private readonly IEmailService _emailService;

        public UserService(IRepositoryUser userRepository, IEmailService emailService)
        {
            _userRepository = userRepository;
            _emailService = emailService;
        }

        public ICollection<UserResponse> GetAllUsers()
        {
            //Test Mail Send
            /*
            string subject = "Bienvenido a nuestro sistema";
            string body = "<h1>Bienvenido</h1><p>Gracias por registrarte en nuestro sistema.</p>";
            _emailService.SendEmail("xxxxxx@gmail.com", subject, body);
            */

            var users = UserResponse.ToDtoList(_userRepository.ListAsync().Result ?? throw new KeyNotFoundException("No se encontraron usuarios"));
            return users;
        }

        public UserResponse GetUserById(int id)
        {
            UserResponse userDto = UserResponse.ToDto(_userRepository.GetByIdAsync(id).Result ?? throw new KeyNotFoundException("No se encontró el usuario"));
            return userDto;
        }

        public User? GetUserByUserName(string userName)
        {
            return _userRepository.GetUserByName(userName);
        }

        public UserResponse CreateUser(UserRequest dto)
        {
            return UserResponse.ToDto(_userRepository.AddAsync(UserRequest.ToEntity(dto)).Result);
        }

        public void UpdateUser(int id, UserRequest dto)
        {

            var existingUser = _userRepository.GetByIdAsync(id).Result ?? throw new KeyNotFoundException("No se encontró el usuario");

            if (_userRepository.GetUserByName(dto.UserName) != null)
                throw new InvalidOperationException("El nombre de usuario ya está en uso.");

            existingUser.Name = dto.Name;
            existingUser.Email = dto.Email;
            existingUser.Password = dto.Password;
            existingUser.UserName = dto.UserName;
            existingUser.UserType = dto.UserType;

            _userRepository.UpdateAsync(existingUser).Wait();
        }

        public void DeleteUser(int id)
        {
            var userDto = _userRepository.GetByIdAsync(id).Result ?? throw new KeyNotFoundException("No se encontró el usuario");
            _userRepository.DeleteAsync(userDto);
        }
    }
}
