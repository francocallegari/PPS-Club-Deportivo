using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class RepositoryCoach : EfRepository<Coach>, IRepositoryCoach
    {
        public RepositoryCoach(ApplicationContext context) : base(context)
        {
        }

        public Coach GetCoachById(int id)
        {
            return _context.Coaches.Include(c => c.SportAssigned).FirstOrDefault(c => c.Id == id);
        }
    }
}
