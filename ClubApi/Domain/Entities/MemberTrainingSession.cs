using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MemberTrainingSession
    {
        [Key]
        public int Id { get; set; }

        public int MemberId { get; set; }
        [ForeignKey("MemberId")]
        public Member Member { get; set; }

        public int TrainingSessionId { get; set; }
        [ForeignKey("TrainingSessionId")]
        public TrainingSession TrainingSession { get; set; }

    }

}
