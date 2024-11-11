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
    public class RepositoryPayment : EfRepository<MembershipFeePayment>, IRepositoryPayment
    {
        public RepositoryPayment(ApplicationContext context) : base(context)
        {
        }
        public List<MembershipFeePayment> GetAllFees()
        {
            return _context.MembershipFeePayments.Include(mfp => mfp.Fee).ToList();
        }
    }
}
