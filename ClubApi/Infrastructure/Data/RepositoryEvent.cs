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
    public class RepositoryEvent : RepositoryBase<Event>, IRepositoryEvent
    {
        private readonly ApplicationContext _context;
        public RepositoryEvent(ApplicationContext context) : base(context)
        {
            _context = context;
        }

        public ICollection<Member> GetAllMembers()
        {
            var listMembers = _context.Events.Include(e => e.Members).SelectMany(e => e.Members).ToList(); //el selectMany extrae todos los miembros de los eventos
            
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
    }
}
