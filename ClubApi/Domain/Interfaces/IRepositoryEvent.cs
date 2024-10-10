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
        List<Event> GetAllEvents();
        Event GetEventById(int id);
        List<Member> GetAllMembers(int eventId);
        ICollection<Event> GetEventsByDate(DateTime eventDate);
        Event GetEventByName(string name);
    }
}
