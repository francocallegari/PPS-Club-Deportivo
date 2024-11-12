using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepositoryTrainingSession : IRepositoryBase<TrainingSession>
    {
        List<TrainingSession> GetAllByCoachId(int id);
        List<TrainingSession> GetAllBySportId(int id);
        bool IsScheduleConflict(TrainingSession newSession);
        TrainingSession GetSessionById(int id);
        List<TrainingSession> GetAllSessions();

    }
}
