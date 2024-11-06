using Application.Models;
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
    public class RepositoryTrainingSession : EfRepository<TrainingSession>, IRepositoryTrainingSession
    {
        public RepositoryTrainingSession(ApplicationContext context) : base(context)
        {
        }
        public TrainingSession GetSessionById(int id)
        {
            return _context.TrainingSessions
                .Include(ts => ts.Sport)
                .Include(ts => ts.Coach)
                .Include(ts => ts.Field)
                .FirstOrDefault(ts => ts.Id == id);
        }
        public List<TrainingSession> GetAllByCoachId(int id)
        {
            return _context.TrainingSessions
                .Include(ts => ts.Sport)
                .Include(ts => ts.Coach)
                .Include(ts => ts.Field)
                .Where(ts => ts.CoachId == id).ToList();
        }

        public List<TrainingSession> GetAllBySportId(int id)
        {
            return _context.TrainingSessions
                .Include(ts => ts.Sport)
                .Include(ts => ts.Coach)
                .Include(ts => ts.Field)
                .Where(ts => ts.SportId == id).ToList();
        }
        public bool IsScheduleConflict(TrainingSession newSession)
        {
            var conflictingSessions = _context.TrainingSessions
                .Where(session =>
                    session.CoachId == newSession.CoachId ||
                    session.SportsFieldId == newSession.SportsFieldId)
                .Where(session => session.DaysOfWeek.Any(day => newSession.DaysOfWeek.Contains(day)))
                .ToList()
                .Where(session =>
                    (newSession.Time >= session.Time && newSession.Time < session.Time.AddMinutes(session.Duration)) ||
                    (session.Time >= newSession.Time && session.Time < newSession.Time.AddMinutes(newSession.Duration)))
                .ToList();

            return conflictingSessions.Where(s => s.Id != newSession.Id).Any(); // Para que no tire error cuando se quiera editar una session
        }
        public List<TrainingSession> GetAllSessions()
        {
            return _context.TrainingSessions
                .Include(ts => ts.Sport)
                .Include(ts => ts.Coach)
                .Include(ts => ts.Field)
                .ToList();
        }
    }
}
