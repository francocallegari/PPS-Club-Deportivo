using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMemberTrainingSessionService
    {
        // Obtener todas las sesiones de entrenamiento de un miembro por su ID
        Task<IEnumerable<MemberTrainingSession>> GetByMemberId(int memberId);
    }
}

