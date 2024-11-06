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
    public class RepositoryField : EfRepository<SportsField>, IRepositoryField
    {
        public RepositoryField(ApplicationContext context) : base(context)
        {
        }
        public List<SportsField> GetBySportId(int id)
        {
            return _context.SportsFields.Include(f => f.Sport).Where(f => f.SportId == id).ToList();
        }
    
    }
}
