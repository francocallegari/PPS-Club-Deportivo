using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models;

namespace Application.Services
{
    public class EventService : IEventService
    {
        private readonly IRepositoryEvent _eventRepository;

        public EventService(IRepositoryEvent eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public ICollection<Event> GetAllEvents()
        {
            return _eventRepository.GetAll();
        }

        public Event GetEventById(int id)
        {
            var eventId = _eventRepository.GetById(id);
            if (eventId == null)
                throw new KeyNotFoundException("No se encontró el evento.");
            return eventId;
        }

        public EventDto GetEventByName(string name)
        {
            var eventEntity = _eventRepository.GetEventByName(name);
            if (eventEntity == null)
                return null;

            return EventDto.Create(eventEntity);
        }

        public Event CreateEvent(Event newEvent)
        {
            newEvent.Status = Domain.Enums.EventStatus.Pending;
            return _eventRepository.Add(newEvent);
        }

        public void UpdateEvent(int id, EventDto updatedEvent)
        {
            var existingEvent = _eventRepository.GetById(id);
            if (existingEvent == null)
                throw new KeyNotFoundException("No se encontro evento con ese ID.");

            var eventWithSameName = _eventRepository.GetEventByName(updatedEvent.Name);
            if(eventWithSameName != null)
                throw new InvalidOperationException("El evento ya existe con el mismo nombre.");

            existingEvent.Name = updatedEvent.Name;
            existingEvent.Description = updatedEvent.Description;
            existingEvent.Date = updatedEvent.Date;
            existingEvent.Capacity = updatedEvent.Capacity;
            existingEvent.Status = updatedEvent.Status;

            _eventRepository.Update(existingEvent);
        }

        public void DeleteEvent(int id)
        {
            var eventId = _eventRepository.GetById(id);
            if (eventId == null)
                throw new KeyNotFoundException("No se encontró el evento.");
            _eventRepository.Delete(eventId);
        }

        public ICollection<Event> GetEventsByIds(List<int> eventIds)
        {
            return _eventRepository.GetAll().Where(e => eventIds.Contains(e.Id)).ToList();
        }
    }
}
