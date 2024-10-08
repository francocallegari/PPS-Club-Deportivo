﻿using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class SportsService : ISportsService
    {
        private readonly IRepositoryBase<Sport> _baseRepository;
        private readonly IRepositorySport _sportRepository;

        public SportsService(IRepositoryBase<Sport> baseRepository, IRepositorySport sportRepository)
        {
            _baseRepository = baseRepository;
            _sportRepository = sportRepository;
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
    }
}
