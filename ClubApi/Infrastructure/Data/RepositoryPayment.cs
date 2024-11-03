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
    public class RepositoryPayment : RepositoryBase<MembershipFeePayment>, IRepositoryPayment
    {
        private readonly ApplicationContext _context; // Cambia ApplicationContext al nombre específico de tu contexto

        public RepositoryPayment(ApplicationContext context) : base(context) // Usa el tipo específico de tu contexto aquí
        {
            _context = context;
        }
    }
}
