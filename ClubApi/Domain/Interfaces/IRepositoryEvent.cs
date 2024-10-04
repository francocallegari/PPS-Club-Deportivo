using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepositoryEvent : IRepositoryBase<Event>
    {
        List<Member> GetAllMembers(int eventId);
        List<Event> GetAllEvents();
        Event GetEventById(int id);
        Event GetEventByName(string name);
        ICollection<Event> GetEventsByDate(DateTime eventDate);
    }
}
