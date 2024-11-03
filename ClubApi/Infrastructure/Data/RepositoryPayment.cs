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
        private readonly ApplicationContext _context;

        public RepositoryPayment(ApplicationContext context) : base(context)
        {
            _context = context;
        }
    }
}
