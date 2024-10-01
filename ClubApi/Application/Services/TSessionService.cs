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

            DateTime endDate = tsDto.Date.Add(tsDto.Duration);

            if (_repositoryTSession.IsCoachAvailable(tsDto.Date, endDate, tsDto.CoachId))
                throw new Exception("Ya hay una clase en ese rango horario dictada por el entrenador: " + coach.Name);

            if (_repositoryTSession.IsFieldAvailable(tsDto.Date, endDate, tsDto.FieldId))
                throw new Exception($"La cancha: {field.Name} no está disponible en el horario establecido");

            if (sport.Id != field.SportId)
                throw new Exception($"La cancha: {field.Name} no coincide con el deporte");

            var newSession = new TrainingSession();
            newSession.Date = tsDto.Date;
            newSession.Duration = tsDto.Duration;
            newSession.CoachId = tsDto.CoachId;
            newSession.Coach = coach;
            newSession.SportId = coach.SportId;
            newSession.Sport = sport;
            newSession.SportsFieldId = tsDto.FieldId;
            newSession.Field = field;

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

            DateTime endDate = tsDto.Date.Add(tsDto.Duration);

            if (_repositoryTSession.IsCoachAvailable(tsDto.Date, endDate, tsDto.CoachId))
                throw new Exception("Ya hay una clase en ese rango horario dictada por el entrenador: " + coach.Name);

            if (_repositoryTSession.IsFieldAvailable(tsDto.Date, endDate, tsDto.FieldId))
                throw new Exception($"La cancha: {field.Name} no está disponible en el horario establecido");

            if (sport.Id != field.SportId)
                throw new Exception($"La cancha: {field.Name} no coincide con el deporte");

            session.Date = tsDto.Date;
            session.Duration = tsDto.Duration;
            session.CoachId = tsDto.CoachId;
            session.Coach = coach;
            session.SportId = coach.SportId;
            session.Sport = sport;
            session.SportsFieldId = tsDto.FieldId;
            session.Field = field;

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
