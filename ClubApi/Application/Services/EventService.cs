using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models;
using Application.Models.Request;

namespace Application.Services
{
    public class EventService : IEventService
    {
        private readonly IRepositoryEvent _eventRepository;
        private readonly IRepositoryUser _userRepository;
        public EventService(IRepositoryEvent eventRepository, IRepositoryUser repositoryUser)
        {
            _eventRepository = eventRepository;
            _userRepository = repositoryUser;
        }

        public List<EventDto> GetAllEvents()
        {
            return EventDto.CreateList(_eventRepository.GetAllEvents());
        }

        public EventDto GetEventById(int id)
        {
            var ev = _eventRepository.GetEventById(id);
            if (ev == null)
                throw new KeyNotFoundException("No se encontró el evento.");
            return EventDto.Create(ev);
        }
        public EventDto GetEventByName(string name)
        {
            var eventEntity = _eventRepository.GetEventByName(name);
            if (eventEntity == null)
                return null;

            return EventDto.Create(eventEntity);
        }
        public List<MemberDto> GetMembersFromEvent(int id)
        {
            return MemberDto.CreateList(_eventRepository.GetAllMembers(id));
        }

        public EventDto CreateEvent(EventRequest newEvent, string creatorName)
        {
            var eventWithSameName = _eventRepository.GetEventByName(newEvent.Name);
            if (eventWithSameName != null)
                throw new InvalidOperationException("Ya existe un evento con el mismo nombre.");

            var eventCreated = new Event();
            eventCreated.Name = newEvent.Name;
            eventCreated.Description = newEvent.Description;
            eventCreated.Date = newEvent.Date;
            eventCreated.Capacity = newEvent.Capacity;
            eventCreated.Status = Domain.Enums.EventStatus.Pending;
            eventCreated.CreatedBy = creatorName;

            return EventDto.Create(_eventRepository.Add(eventCreated));
        }

        public void UpdateEvent(int id, EventRequest updatedEvent)
        {
            var eventUp = _eventRepository.GetEventById(id)
                ?? throw new Exception("Evento no encontrado");

            var eventWithSameName = _eventRepository.GetEventByName(updatedEvent.Name);
            if (eventWithSameName != null)
                throw new InvalidOperationException("El evento ya existe con el mismo nombre.");

            eventUp.Name = updatedEvent.Name;
            eventUp.Description = updatedEvent.Description;
            eventUp.Date = updatedEvent.Date;
            eventUp.Capacity = updatedEvent.Capacity;

            _eventRepository.Update(eventUp);
        }

        public void DeleteEvent(int id)
        {
            var ev = _eventRepository.GetEventById(id);
            if (ev == null)
                throw new KeyNotFoundException("No se encontró el evento.");
            _eventRepository.Delete(ev);
        }

        public ICollection<Event> GetEventsByIds(List<int> eventIds)
        {
            return _eventRepository.GetAll().Where(e => eventIds.Contains(e.Id)).ToList();
        }

        public void SignUpEvent(int memberId, int eventId)
        {
            var dateToday = DateTime.Now;
            var response = _userRepository.GetById(memberId);
            if (response == null || response.UserType != "Member")
                throw new InvalidOperationException("No se encontró al miembro.");

            var eventEntity = _eventRepository.GetEventById(eventId);
            if (eventEntity == null)
                throw new InvalidOperationException("No se encontró evento.");

            if (eventEntity.Members.Any(m => m.Id == memberId))
                throw new InvalidOperationException("El miembro ya está inscripto en este evento.");

            if(eventEntity.Date < dateToday)
                throw new InvalidOperationException("No puede inscribirse al evento porque ya pasó su fecha");

            eventEntity.Members.Add((Member)response);
            _eventRepository.Update(eventEntity);
        }
        public void ApproveEvent(int directorId, int eventId)
        {
            var director = _userRepository.GetById(directorId)
                ?? throw new Exception("No se encontró al usuario");

            var existingEvent = _eventRepository.GetEventById(eventId)
                ?? throw new Exception("No se encontró el evento");

            existingEvent.Status = Domain.Enums.EventStatus.Approved;
            existingEvent.ApprovedBy = director.Name;
            _eventRepository.Update(existingEvent);
        }
        public void DropOutEvent(int memberId, int eventId)
        {
            var response = _userRepository.GetById(memberId);
            if (response == null || response.UserType != "Member")
                throw new InvalidOperationException("No se encontró al miembro.");

            var eventEntity = _eventRepository.GetEventById(eventId);
            if (eventEntity == null)
                throw new InvalidOperationException("No se encontró el evento.");

            if (!eventEntity.Members.Any(m => m.Id == memberId))
                throw new InvalidOperationException("El miembro no está inscripto en este evento.");

            eventEntity.Members.Remove((Member)response);
            _eventRepository.Update(eventEntity);
        }
    }
}
