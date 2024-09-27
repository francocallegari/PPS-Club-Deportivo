using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserService _userService;
        private readonly INewsService _newsService;
        private readonly IEventService _eventService;

        public AdminService(IUserService userService, INewsService newsService, IEventService eventService)
        {
            _userService = userService;
            _newsService = newsService;
            _eventService = eventService;
        }

        public ICollection<UserResponse> GetAllAdmins()
        {
            return _userService.GetAllUsers().Where(u => u.UserType == "Admin").ToList();
        }

        public UserResponse GeAdminById(int id)
        {
            var admin = _userService.GetUserById(id);
            if (admin.UserType.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                throw new KeyNotFoundException("No se encontró un administrador con ese ID.");
            return admin;
        }

        public void UpDateAdmin(int id, UserRequest adminRequest)
        {
            var existingAdmin = _userService.GetUserById(id);
            if (existingAdmin.UserType.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo se pueden actualizar administradores.");

            _userService.UpdateUser(id, adminRequest);
        }

        public void DeleteAdmin(int id)
        {
            var existingAdmin = _userService.GetUserById(id);
            if (existingAdmin.UserType.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo se pueden eliminar administradores.");

            _userService.DeleteUser(id);
        }

        public void CreateAdmin(UserRequest adminRequest)
        {
            if (adminRequest.UserType.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("El tipo de usuario debe ser administrador.");

            _userService.CreateUser(adminRequest);
        }

        public void PostNews(int idAdmin, NewsDto newsDto)
        {
            var admin = _userService.GetUserById(idAdmin);

            if(!admin.UserType.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo los administradores pueden publicar noticias.");

            var news = new News
            {
                Title = newsDto.Title,
                Description = newsDto.Description,
                ImageUrl = newsDto.ImageUrl,
                PublicationDate = newsDto.PublicationDate
            };

            _newsService.CreateNews(news);
        }

        public void PostEvent(int idAdmin, EventDto eventDto)
        {
            var admin = _userService.GetUserById(idAdmin);

            if (!admin.UserType.Equals("Admin", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo los administradores pueden publicar eventos.");

            var events = new Event
            {
                Name = eventDto.Name,
                Description = eventDto.Description,
                Capacity = eventDto.Capacity,
                Date = eventDto.Date,
                Status = eventDto.Status
            };

            _eventService.CreateEvent(events);
        }
    }
}
