﻿using Application.Models;
using Application.Models.Request;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEventService
    {
        List<EventDto> GetAllEvents();
        EventDto GetEventById(int id);
        EventDto GetEventByName(string name);
        List<MemberDto> GetMembersFromEvent(int id);
        EventDto CreateEvent(EventRequest newEvent, string creatorName);
        void UpdateEvent(int id, EventRequest updatedEvent);
        void DeleteEvent(int id);
        ICollection<Event> GetEventsByIds(List<int> eventIds);
        void SignUpEvent(int memberId, int eventId);
        void DropOutEvent(int memberId, int eventId);
        void ApproveEvent(int directorId, int eventId);
    }
}
