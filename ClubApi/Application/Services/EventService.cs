using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;

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
            var ev = _eventRepository.GetById(id);
            if (ev == null)
                throw new KeyNotFoundException("No se encontró el evento.");
            return ev;
        }

        public Event CreateEvent(Event newEvent)
        {
            newEvent.Status = Domain.Enums.EventStatus.Pending;
            return _eventRepository.Add(newEvent);
        }

        public void UpdateEvent(Event updatedEvent)
        {
            _eventRepository.Update(updatedEvent);
        }

        public void DeleteEvent(int id)
        {
            var ev = _eventRepository.GetById(id);
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
