using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MembershipFeePayment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int MemberId { get; set; }
        [ForeignKey("MemberId")]
        public Member Member { get; set; }
        public int FeeId { get; set; }
        [ForeignKey("FeeId")]
        public MembershipFee Fee { get; set; }
        public FeeStatus Status { get; set; }
        public DateTime PaymentDate { get; set; }
        //public float Price { get; set; }
    }
}
