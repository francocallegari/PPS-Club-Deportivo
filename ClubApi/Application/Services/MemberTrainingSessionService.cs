using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MemberTrainingSessionService : IMemberTrainingSessionService
    {
        private readonly IRepositoryMemberTrainingSession _repository;

        public MemberTrainingSessionService(IRepositoryMemberTrainingSession repository)
        {
            _repository = repository;
        }

        // Obtener todas las sesiones de entrenamiento de un miembro por su ID, con detalles relacionados
        public async Task<IEnumerable<MemberTrainingSession>> GetByMemberId(int memberId)
        {
            var memberTrainingSessions = await _repository.GetByMemberIdWithDetails(memberId).ToListAsync();

            // Si no se encuentran sesiones, devolvemos un NotFound
            if (memberTrainingSessions == null || !memberTrainingSessions.Any())
            {
                throw new Exception($"No se encontraron sesiones de entrenamiento para el miembro con ID {memberId}");
            }

            return memberTrainingSessions;
        }
    }
}

