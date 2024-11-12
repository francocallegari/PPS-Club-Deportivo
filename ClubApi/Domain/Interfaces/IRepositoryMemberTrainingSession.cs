using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepositoryMemberTrainingSession : IRepositoryBase<MemberTrainingSession>
    {
        // Método para obtener sesiones por miembro
        Task<IEnumerable<MemberTrainingSession>> GetByMemberId(int memberId);

        IQueryable<MemberTrainingSession> GetByMemberIdWithDetails(int memberId);
    }
}
