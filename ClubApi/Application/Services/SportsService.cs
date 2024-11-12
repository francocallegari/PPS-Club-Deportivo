using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class SportsService : ISportsService
    {
        private readonly IRepositoryBase<Sport> _baseRepository;
        private readonly IRepositorySport _sportRepository;
        private readonly IRepositoryUser _userRepository;
        private readonly IRepositoryCoach _repositoryCoach;
        private readonly IRepositoryTrainingSession _trainingSessionRepository;

        public SportsService(IRepositoryBase<Sport> baseRepository, IRepositorySport sportRepository, IRepositoryUser userRepository, IRepositoryCoach repositoryCoach, IRepositoryTrainingSession trainingSessionRepository)
        {
            _baseRepository = baseRepository;
            _sportRepository = sportRepository;
            _userRepository = userRepository;
            _repositoryCoach = repositoryCoach;
            _trainingSessionRepository = trainingSessionRepository;
        }

        public ICollection<SportDto> GetAllSports()
        {
            return SportDto.CreateList(_baseRepository.GetAll());
        }

        public SportDto GetSportByName(string name)
        {
            return SportDto.Create(_sportRepository.GetSportByName(name));
        }

        public List<MemberDto> GetAllMembers(int sportId)
        {
            return MemberDto.CreateList(_sportRepository.GetAllMembers(sportId));
        }

        public SportDto CreateSport(SportDto sport)
        {
            return SportDto.Create(_baseRepository.Add(SportDto.From(sport)));
        }

        public void UpdateSport(int id, SportDto sport)
        {
            var existingSport = _sportRepository.GetSportByName(sport.Name) ?? throw new KeyNotFoundException("No se encontró el usuario");

            if (existingSport != null)
                throw new InvalidOperationException("El nombre del deporte ya está en uso.");

            existingSport.Name = sport.Name;
            existingSport.Capacity = sport.Capacity;
            //existingSport.Members = MemberDto.CreateList(sport.Members);

            _baseRepository.Update(existingSport);
        }

        public void DeleteSport(int id)
        {
            var sport = _baseRepository.GetById(id) ?? throw new KeyNotFoundException("No se encontró el deporte");
            _baseRepository.Delete(sport);
        }
        public void SignUpSport(int sportId, int memberId)
        {
            var sport = _sportRepository.GetById(sportId)
                ?? throw new KeyNotFoundException("No se encontró el deporte");

            var member = _userRepository.GetMemberById(memberId)
                ?? throw new KeyNotFoundException("No se encontró al socio");

            if(sport.Members.Count >= sport.Capacity)
            {
                throw new InvalidOperationException("Ya se alcanzó la cantidad máxima de inscriptos en el deporte");
            }


            if (!member.SportsAttended.Contains(sport))
            {
                sport.Members.Add(member);
                member.SportsAttended.Add(sport);
                _userRepository.Update(member);
                _sportRepository.Update(sport); 
            }
            else
            {
                throw new InvalidOperationException($"El socio ya está inscripto en {sport.Name}");
            }
        }

        public void DropOutSport(int sportId, int memberId) 
        {
            var sport = _sportRepository.GetById(sportId)
                ?? throw new KeyNotFoundException("No se encontró el deporte");

            var member = _userRepository.GetMemberById(memberId)
                ?? throw new KeyNotFoundException("No se encontró al socio");


            if (member.SportsAttended.Contains(sport))
            {
                sport.Members.Remove(member);
                member.SportsAttended.Remove(sport);
                _userRepository.Update(member);
                _sportRepository.Update(sport);
            }
            else
            {
                throw new InvalidOperationException($"El socio no se pudo desinscribir porque no está inscripto en el deporte");
            }
        }

        public void SignUpSportSession(int sessionId, int memberId)
        {
            var session = _trainingSessionRepository.GetById(sessionId)
                ?? throw new KeyNotFoundException("No se encontró la sesión de entrenamiento");

            var member = _userRepository.GetMemberById(memberId)
                ?? throw new KeyNotFoundException("No se encontró al socio");

            // Check if the member is already enrolled in the session
            if (member.SessionsAttended.Contains(session))
            {
                throw new InvalidOperationException($"El socio ya está inscrito en la sesión con ID {sessionId}");
            }

            // Add the session to the member's attended sessions and the member to the session's members
            session.Members.Add(member);
            member.SessionsAttended.Add(session);

            // Update the member and the session using the repositories
            _userRepository.Update(member);
            _trainingSessionRepository.Update(session);
        }


        public SportDto GetByCoachId(int coachId)
        {
            var coach = _repositoryCoach.GetCoachById(coachId)
                ?? throw new KeyNotFoundException("No se encontró al profesor");

            var sport = _sportRepository.GetById(coach.SportId)
                ?? throw new KeyNotFoundException("No se encontró el deporte");

            return SportDto.Create(sport);
        }
    }
}
