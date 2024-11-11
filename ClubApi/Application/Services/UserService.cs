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
        private readonly IRepositoryMembershipFee _repositoryMembershipFee;
        private readonly IRepositorySport _repositorySport;

        public UserService(IRepositoryUser userRepository, 
            IEmailService emailService, 
            IRepositoryMembershipFee repositoryMembershipFee,
            IRepositorySport repositorySport)
        {
            _userRepository = userRepository;
            _emailService = emailService;
            _repositoryMembershipFee = repositoryMembershipFee;
            _repositorySport = repositorySport;
        }

        public ICollection<UserResponse> GetAllUsers()
        {
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

        public User? GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }

        public UserResponse CreateUser(UserRequest dto)
        {
            var existingUser = _userRepository.GetUserByName(dto.UserName);

            if (existingUser != null)
            {
                throw new InvalidOperationException("El nombre de usuario ya está en uso.");
            }

            var user = UserResponse.ToDto(_userRepository.AddAsync(UserRequest.ToEntity(dto)).Result);


            if (user != null)
                _emailService.SendWelcomeEmail(user);

            return user;
        }

        public void UpdateUser(int id, UserUpdateRequest dto)
        {

            var existingUser = _userRepository.GetByIdAsync(id).Result ?? throw new KeyNotFoundException("No se encontró el usuario");

            var existingUserName = _userRepository.GetUserByName(dto.UserName);

            if (existingUserName != null && existingUserName.Id != id)
                throw new InvalidOperationException("El nombre de usuario ya está en uso.");

            existingUser.Name = dto.Name;
            existingUser.Email = dto.Email;
            existingUser.UserName = dto.UserName;
            existingUser.UserType = dto.UserType;
            existingUser.PhoneNumber = dto.PhoneNumber;
            existingUser.Dni = dto.Dni;
            existingUser.Address = dto.Address;
            existingUser.DateOfBirth = dto.DateOfBirth;

            _userRepository.UpdateAsync(existingUser).Wait();
        }

        public void DeleteUser(int id)
        {
            var userDto = _userRepository.GetByIdAsync(id).Result ?? throw new KeyNotFoundException("No se encontró el usuario");
            _userRepository.DeleteAsync(userDto);
        }

        public User RegisterUser(UserRequest dto)
        {
            var existingUser = _userRepository.GetUserByEmail(dto.Email);
            var user = new User();
            var sport = new Sport();

            if (existingUser != null)
            {
                throw new InvalidOperationException("El usuario ya está registrado.");
            }

            if (dto.UserType == "Coach")
            {
                if (!dto.SportId.HasValue)
                {
                    throw new InvalidOperationException("El Coach debe tener un SportId.");
                } else
                {
                    sport = _repositorySport.GetById(dto.SportId)
                        ?? throw new InvalidOperationException("No se encontró el deporte");
                }

                var coach = new Coach
                {
                    UserName = dto.UserName,
                    Email = dto.Email,
                    Password = dto.Password,
                    UserType = dto.UserType,
                    PhoneNumber = dto.PhoneNumber,
                    Name = dto.Name,
                    UserRegistrationDate = DateTime.Now,
                    DateOfBirth = dto.DateOfBirth,
                    Dni = dto.Dni,
                    Address = dto.Address,
                    SportId = dto.SportId.Value, // Asignar el SportId recibido en la solicitud
                    SportAssigned = sport
                };

                user = _userRepository.Add(coach);
            }
            else
            {
                var newUser = new User
                {
                    UserName = dto.UserName,
                    Email = dto.Email,
                    Password = dto.Password,
                    UserType = dto.UserType,
                    PhoneNumber = dto.PhoneNumber,
                    Name = dto.Name,
                    UserRegistrationDate = DateTime.Now,
                    DateOfBirth = dto.DateOfBirth,
                    Dni = dto.Dni,
                    Address = dto.Address
                };

                user = _userRepository.Add(newUser);

                if (newUser.UserType == "Member")
                {
                    _repositoryMembershipFee.GenerateFeeForNewMember(newUser);
                }
            }

            return user;
        }
    }
}
