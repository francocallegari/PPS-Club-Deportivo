using Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class MembershipFee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public float Price { get; set; }
        public DateTime ExpirationDate { get; set; }

        public ICollection<MemberTrainingSession> SessionsAttended { get; set; } = new List<MemberTrainingSession>();
    }
}
