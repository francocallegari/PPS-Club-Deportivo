using Application.Interfaces;
using Application.Models;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class FieldService : IFieldService
    {
        private readonly IRepositoryField _fieldRepository;
        public FieldService(IRepositoryField fieldRepository)
        {
            _fieldRepository = fieldRepository;
        }
        public List<SportsFieldDto> GetBySportId(int id)
        {
            var fields = _fieldRepository.GetBySportId(id)
                ?? throw new Exception("No se encontraron canchas para el deporte solicitado");
            return SportsFieldDto.CreateList(fields);
        }
    }
}
