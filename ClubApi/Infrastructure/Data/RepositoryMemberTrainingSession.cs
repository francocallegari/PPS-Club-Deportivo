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
    public class RepositoryMemberTrainingSession : IRepositoryMemberTrainingSession
    {
        private readonly ApplicationContext _context;

        public RepositoryMemberTrainingSession(ApplicationContext context)
        {
            _context = context;
        }

        public MemberTrainingSession Add(MemberTrainingSession entity)
        {
            _context.MemberTrainingSession.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(MemberTrainingSession entity)
        {
            _context.MemberTrainingSession.Remove(entity);
            _context.SaveChanges();
        }

        public List<MemberTrainingSession> GetAll()
        {
            return _context.MemberTrainingSession.ToList();
        }

        // Implementación del método GetById<TId>
        public MemberTrainingSession? GetById<TId>(TId id)
        {
            // Usamos el tipo específico de ID para buscar la sesión por su Id
            return _context.MemberTrainingSession
                           .FirstOrDefault(mts => mts.Id.Equals(id)); // Suponiendo que "Id" es el campo clave primaria
        }

        // Método asincrónico para obtener sesiones por miembro
        public async Task<IEnumerable<MemberTrainingSession>> GetByMemberId(int memberId)
        {
            return await _context.MemberTrainingSession
                                 .Where(mts => mts.MemberId == memberId)
                                 .ToListAsync();
        }

        public void Update(MemberTrainingSession entity)
        {
            _context.MemberTrainingSession.Update(entity);
            _context.SaveChanges();
        }

        public IQueryable<MemberTrainingSession> GetByMemberIdWithDetails(int memberId)
        {
            return _context.MemberTrainingSession
                           .Where(mts => mts.MemberId == memberId)
                           .Include(mts => mts.TrainingSession)  // Incluye las sesiones de entrenamiento
                           .ThenInclude(ts => ts.Sport)          // Incluye el deporte de la sesión
                           .Include(mts => mts.TrainingSession)  // Incluye las sesiones de entrenamiento
                           .ThenInclude(ts => ts.Field)          // Incluye el campo de la sesión
                           .Include(mts => mts.TrainingSession)  // Incluye las sesiones de entrenamiento
                           .ThenInclude(ts => ts.Coach);         // Incluye el entrenador de la sesión

        }

    }
}