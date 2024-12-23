﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class TrainingSession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public TimeOnly Time { get; set; }
        public int Duration { get; set; }
        public int SportsFieldId { get; set; }
        [ForeignKey("SportsFieldId")]
        public SportsField Field { get; set; }
        public int CoachId { get; set; }
        [ForeignKey("CoachId")]
        public Coach Coach { get; set; }
        public int SportId { get; set; }
        [ForeignKey("SportId")]
        public Sport Sport { get; set; }
        public List<int> DaysOfWeek { get; set; }

        public ICollection<Member> Members { get; set; } = new List<Member>();
    }
}
