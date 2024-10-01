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
    public class RepositorySport : RepositoryBase<Sport>, IRepositorySport
    {
        private readonly ApplicationContext _context;
        public RepositorySport(ApplicationContext context) : base(context)
        {
            _context = context;
        }

        public Sport GetSportByName(string name)
        {
            var sport = _context.Sports.FirstOrDefault(s => s.Name == name);

            if (sport == null)
            {
                throw new Exception("No se encontraron deportes con ese nombre.");
            }

            return sport;
        }

        public List<Member> GetAllMembers(int sportId)
        {
            var members = _context.Members
                .Include(m => m.SportsAttended)
                .Where(m => m.SportsAttended.Any(s => s.Id == sportId))
                .ToList();

            if (members.Count == 0)
            {
                throw new Exception("No se encontraron miembros.");
            }

            return members;
        }
    }
}
