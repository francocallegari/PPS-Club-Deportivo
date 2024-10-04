using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class RepositoryEvent : EfRepository<Event>, IRepositoryEvent
    {
        public RepositoryEvent(ApplicationContext context) : base(context)
        { }

        public List<Event> GetAllEvents()
        {
            return _context.Events.Include(e => e.Members).ToList();
        }
        public Event GetEventById(int id)
        {
            return _context.Events.Include(e => e.Members).FirstOrDefault(e => e.Id == id);
        }
        public List<Member> GetAllMembers(int eventId)
        {
            var listMembers = _context.Events
                .Include(e => e.Members)
                .Where(e => e.Id == eventId)
                .Select(e => e.Members)
                .FirstOrDefault()        
                ?.ToList();

            if (listMembers.Count == 0)
            {
                throw new Exception("No se encontraron miembros");
            }

            return listMembers;
        }

        public ICollection<Event> GetEventsByDate(DateTime eventDate)
        {
            var eventsOnDate = _context.Events.Where(e => e.Date.Date == eventDate.Date).ToList();

            if (eventsOnDate.Count == 0)
            {
                throw new Exception("No se encontraron eventos en la fecha proporcionada.");
            }

            return eventsOnDate;
        }
        public Event GetEventByName(string name)
        {
            var events = _context.Events.FirstOrDefault(e => e.Name.ToLower() == name.ToLower());

            return events;
        }
    }
}
