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
        public bool IsCoachAvailable(DateTime initialDate, DateTime endDate, int coachId)
        {
            return !_context.TrainingSessions
                .Any(ts => ts.CoachId == coachId &&
                ((initialDate >= ts.Date && initialDate < ts.Date.Add(ts.Duration)) || 
                (endDate > ts.Date && endDate <= ts.Date.Add(ts.Duration)) ||
                (initialDate <= ts.Date && endDate >= ts.Date.Add(ts.Duration))));
        }
        public bool IsFieldAvailable(DateTime initialDate, DateTime endDate, int fieldId)
        {
            return !_context.TrainingSessions
                .Any(ts => ts.SportsFieldId == fieldId &&
                ((initialDate >= ts.Date && initialDate < ts.Date.Add(ts.Duration)) ||
                (endDate > ts.Date && endDate <= ts.Date.Add(ts.Duration)) ||
                (initialDate <= ts.Date && endDate >= ts.Date.Add(ts.Duration))));
        }
    }
}
