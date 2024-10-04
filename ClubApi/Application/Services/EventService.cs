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

        public EventService(IRepositoryEvent eventRepository)
        {
            _eventRepository = eventRepository;
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

        public EventDto CreateEvent(EventRequest newEvent)
        {
            var eventCreated = new Event();
            eventCreated.Name = newEvent.Name;
            eventCreated.Description = newEvent.Description;
            eventCreated.Date = newEvent.Date;
            eventCreated.Capacity = newEvent.Capacity;
            eventCreated.Status = Domain.Enums.EventStatus.Pending;

            return EventDto.Create(_eventRepository.Add(eventCreated));
        }

        public void UpdateEvent(int id, EventRequest updatedEvent)
        {
            var eventUp = _eventRepository.GetEventById(id)
                ?? throw new Exception("Evento no encontrado");

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
    }
}
