using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    
    
        public class PaymentService : IPaymentService
        {
            private readonly IRepositoryPayment _paymentRepository;

            public PaymentService(IRepositoryPayment paymentRepository)
            {
                _paymentRepository = paymentRepository;
            }

            
            public void MakeFeePayment(int memberId, int feeId)
            {
                
                var feePayment = _paymentRepository.GetAll()
                                         .FirstOrDefault(mfp => mfp.MemberId == memberId && mfp.FeeId == feeId && mfp.Status == FeeStatus.Pending);

                if (feePayment == null)
                {
                    throw new Exception("No se encontró una cuota pendiente para este miembro.");
                }

                
                feePayment.Status = FeeStatus.Paid;
                feePayment.PaymentDate = DateTime.Now;

                
                _paymentRepository.Update(feePayment);
            }

            
            public List<MembershipFeePayment> GetMemberFees(int memberId, FeeStatus? status = null)
            {
                var query = _paymentRepository.GetAll().Where(mfp => mfp.MemberId == memberId);

                if (status.HasValue)
                {
                    query = query.Where(mfp => mfp.Status == status);
                }

                return query.ToList();
            }
        }
    }

