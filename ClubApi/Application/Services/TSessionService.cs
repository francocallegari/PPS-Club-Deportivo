using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TSessionService : ITSessionService
    {
        private readonly IRepositoryTrainingSession _repositoryTSession;
        private readonly IRepositoryCoach _repositoryCoach;
        private readonly IRepositoryBase<SportsField> _repositoryField;
        private readonly IRepositorySport _repositorySport;
        public TSessionService(
            IRepositoryTrainingSession repositoryTSession, 
            IRepositoryCoach repositoryCoach, 
            IRepositoryBase<SportsField> repositoryField, 
            IRepositorySport repositorySport
            )
        {
            _repositoryTSession = repositoryTSession;
            _repositoryCoach = repositoryCoach;
            _repositoryField = repositoryField;
            _repositorySport = repositorySport;
        }

        public List<TrainingSessionDto> GetTSbyCoachId(int id)
        {
            var coach = _repositoryCoach.GetCoachById(id);
            var sessions = _repositoryTSession.GetAllByCoachId(id)
                ?? throw new Exception("No hay clases dictadas por el entrenador: " + coach.Name);

            return TrainingSessionDto.CreateList(sessions);
        }
        public TrainingSessionDto CreateTS(TSessionRequest tsDto)
        {
            var coach = _repositoryCoach.GetCoachById(tsDto.CoachId)
                ?? throw new Exception("No se encontró ese entrenador");
            var sport = _repositorySport.GetById(coach.SportId)
                ?? throw new Exception("No se encontró ese deporte");
            var field = _repositoryField.GetById(tsDto.FieldId)
                ?? throw new Exception("No se encontró esa cancha");

            if (sport.Id != field.SportId)
                throw new Exception($"La cancha: {field.Name} no coincide con el deporte");

            var newSession = new TrainingSession();
            newSession.Time = tsDto.Time;
            newSession.Duration = tsDto.Duration;
            newSession.CoachId = tsDto.CoachId;
            newSession.Coach = coach;
            newSession.SportId = coach.SportId;
            newSession.Sport = sport;
            newSession.SportsFieldId = tsDto.FieldId;
            newSession.Field = field;
            newSession.DaysOfWeek = tsDto.DaysOfWeek;

            if (_repositoryTSession.IsScheduleConflict(newSession)) 
                throw new InvalidOperationException($"Ocurrió un error. Ya existe una clase en ese horario para el profesor: {coach.Name} o la cancha se encuentra ocupada");

            return TrainingSessionDto.Create(_repositoryTSession.Add(newSession));
        }
        public void UpdateTS(int sessionID, TSessionRequest tsDto)
        {
            var session = _repositoryTSession.GetSessionById(sessionID)
                ?? throw new Exception("No se encontró la clase");
            var coach = _repositoryCoach.GetCoachById(tsDto.CoachId)
                ?? throw new Exception("No se encontró al entrenador");
            var sport = _repositorySport.GetById(coach.SportId)
                ?? throw new Exception("No se encontró ese deporte");
            var field = _repositoryField.GetById(tsDto.FieldId)
                ?? throw new Exception("No se encontró esa cancha");

            if (sport.Id != field.SportId)
                throw new Exception($"La cancha: {field.Name} no coincide con el deporte");

            session.Time = tsDto.Time;
            session.Duration = tsDto.Duration;
            session.CoachId = tsDto.CoachId;
            session.Coach = coach;
            session.SportId = coach.SportId;
            session.Sport = sport;
            session.SportsFieldId = tsDto.FieldId;
            session.Field = field;
            session.DaysOfWeek = tsDto.DaysOfWeek;

            if (_repositoryTSession.IsScheduleConflict(session))
                throw new InvalidOperationException($"Ocurrió un error. Ya existe una clase en ese horario para el profesor: {coach.Name} o la cancha se encuentra ocupada");

            _repositoryTSession.Update(session);
        }
        public void DeleteTS(int sessionID)
        {
            var session = _repositoryTSession.GetSessionById(sessionID)
                ?? throw new Exception("No se encontró la clase");

            _repositoryTSession.Delete(session);
        }
    }
}
