﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEventService
    {
        ICollection<Event> GetAllEvents();       
        Event GetEventById(int id);             
        Event CreateEvent(Event newEvent);     
        void UpdateEvent(Event updatedEvent);   
        void DeleteEvent(int id);                
        ICollection<Event> GetEventsByIds(List<int> eventIds);
    }
}