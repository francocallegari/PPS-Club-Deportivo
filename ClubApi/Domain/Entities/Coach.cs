
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Coach : User
    {
        public int SportId { get; set; }
        [ForeignKey("SportId")]
        public Sport SportAssigned { get; set; }
    }
}
