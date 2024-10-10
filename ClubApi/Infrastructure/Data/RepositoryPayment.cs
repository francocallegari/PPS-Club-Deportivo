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
        public RepositoryPayment(DbContext context) : base(context)
        {
        }
    }
}
