using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public DateTime Date { get; set; }
        public EventStatus Status { get; set; }
        //public List<MemberDto> Members { get; set; }

        public static EventDto Create(Event club_event)
        {
            var dto = new EventDto();
            dto.Id = club_event.Id;
            dto.Name = club_event.Name;
            dto.Description = club_event.Description;
            dto.Capacity = club_event.Capacity;
            dto.Date = club_event.Date;
            dto.Status = club_event.Status;
            //dto.Members = MemberDto.CreateList(club_event.Members);

            return dto;

        }
        public static List<EventDto> CreateList(List<Event> events)
        {
            List<EventDto> listDto = [];
            foreach (var e in events)
            {
                listDto.Add(Create(e));
            }

            return listDto;
        }
    }
}
