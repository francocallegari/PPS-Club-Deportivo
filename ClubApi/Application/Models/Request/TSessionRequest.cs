using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Request
{
    public class TSessionRequest
    {
        public TimeOnly Time { get; set; }
        public int Duration { get; set; }
        public int FieldId { get; set; }
        public int CoachId { get; set; }
        public List<int> DaysOfWeek { get; set; }
    }
}
