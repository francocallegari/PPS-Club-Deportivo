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
        ICollection<Member> GetAllMembers();
        ICollection<Event> GetEventsByDate(DateTime eventDate);
        Event GetEventByName(string name);
    }
}
