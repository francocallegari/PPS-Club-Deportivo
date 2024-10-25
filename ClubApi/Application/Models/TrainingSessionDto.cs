using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class TrainingSessionDto
    {
        public int Id { get; set; }
        public TimeOnly Time { get; set; }
        public TimeSpan Duration { get; set; }
        public SportsFieldDto Field { get; set; }
        public CoachDto Coach { get; set; }
        public List<int> DaysOfWeek { get; set; }
        //public SportDto Sport { get; set; }

        public static TrainingSessionDto Create(TrainingSession session)
        {
            var dto = new TrainingSessionDto();
            dto.Id = session.Id;
            dto.Time = session.Time;
            dto.Duration = session.Duration;
            dto.Field = SportsFieldDto.Create(session.Field);
            dto.Coach = CoachDto.Create(session.Coach);
            dto.DaysOfWeek = session.DaysOfWeek;
            //dto.Sport = SportDto.Create(session.Sport);

            return dto;

        }

        public static List<TrainingSessionDto> CreateList(List<TrainingSession> sessions)
        {
            List<TrainingSessionDto> listDto = [];
            foreach (var s in sessions)
            {
                listDto.Add(Create(s));
            }

            return listDto;
        }
    }
}
