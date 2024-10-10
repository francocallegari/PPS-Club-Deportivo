using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPaymentService
    {
        void MakeFeePayment(int memberId, int feeId);
        List<MembershipFeePayment> GetMemberFees(int memberId, FeeStatus? status = null);

    }
}
