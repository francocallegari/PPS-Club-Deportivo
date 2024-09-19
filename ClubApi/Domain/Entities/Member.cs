using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Member : User
    {
        public List<Sport> SportsAttended { get; set; }
    }
}
