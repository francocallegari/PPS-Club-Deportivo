using Application.Interfaces;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MembershipFeeService : IMembershipFeeService
    {
        private readonly IRepositoryMembershipFee _repositoryFee;
        public MembershipFeeService(IRepositoryMembershipFee repositoryFee)
        {
            _repositoryFee = repositoryFee;
        }
        public void UpdateFeesPrice(float price)
        {
            _repositoryFee.UpdateFeesPrice(price);
        }
        public void UpdateFeeStatus(int id)
        {
            _repositoryFee.UpdateFeeStatus(id);
        }
    }
}
