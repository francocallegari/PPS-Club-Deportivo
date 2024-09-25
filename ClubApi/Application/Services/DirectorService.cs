using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DirectorService : IDirectorService
    {
        private readonly IUserService _userService;

        public DirectorService(IUserService userService)
        {
            _userService = userService;
        }

        public ICollection<UserResponse> GetAllDirectors()
        {
            
            return _userService.GetAllUsers().Where(u => u.UserType == "Director").ToList();
        }

        public UserResponse GetDirectorById(int id)
        {
            var director = _userService.GetUserById(id);
            if (director.UserType.Equals("Director", StringComparison.OrdinalIgnoreCase))
                throw new KeyNotFoundException("No se encontró un director con ese ID.");
            return director;
        }

        public void UpdateDirector(int id, UserRequest directorRequest)
        {
            
            var existingDirector = _userService.GetUserById(id);
            if (existingDirector.UserType.Equals("Director", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo se pueden actualizar directores.");

           
            _userService.UpdateUser(id, directorRequest);
        }

        public void DeleteDirector(int id)
        {
            var existingDirector = _userService.GetUserById(id);
            if (existingDirector.UserType.Equals("Director", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo se pueden eliminar directores.");

            _userService.DeleteUser(id);
        }

        public void CreateDirector(UserRequest directorRequest)
        {
            if (directorRequest.UserType.Equals ("Director", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("El tipo de usuario debe ser Director.");

            _userService.CreateUser(directorRequest);
        }
    }
}
