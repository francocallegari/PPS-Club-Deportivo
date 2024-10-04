﻿using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Enums;
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
        private readonly IEventService _eventService;

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

        // Iria en el Event Service

        /*public void ApproveEvents(int directorId, List<int> eventIds)
        {
            var director = _userService.GetUserById(directorId);

            
            if (!director.UserType.Equals("Director", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo los directores pueden aprobar eventos.");

            
            var eventsToApprove = _eventService.GetEventsByIds(eventIds)
                .Where(e => e.Status == EventStatus.Pending &&
                            _userService.GetUserByUserName(e.CreatedBy).UserType == "Administrator")
                .ToList();

            if (!eventsToApprove.Any())
                throw new InvalidOperationException("No hay eventos válidos para aprobar.");

            
            foreach (var ev in eventsToApprove)
            {
                ev.Status = EventStatus.Approved;
                ev.ApprovedBy = director.UserName;  
                _eventService.UpdateEvent(ev);
            }
        }*/
    }
}
