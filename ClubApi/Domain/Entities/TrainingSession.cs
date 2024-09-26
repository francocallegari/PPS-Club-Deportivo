using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class TrainingSession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public int SportsFieldId { get; set; }
        [ForeignKey("SportsFieldId")]
        public SportsField Field { get; set; }
        public int CoachId { get; set; }
        [ForeignKey("CoachId")]
        public Coach Coach { get; set; }
        public int SportId { get; set; }
        [ForeignKey("SportId")]
        public Sport Sport { get; set; }
    }
}
