using Application.Interfaces;
using Application.Models;
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
        private readonly IRepositoryBase<MembershipFee> _membershipFeeRepository;

        public PaymentService(IRepositoryPayment paymentRepository, IRepositoryBase<MembershipFee> membershipFeeRepository)
        {
            _paymentRepository = paymentRepository;
            _membershipFeeRepository = membershipFeeRepository;
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

        public List<MemberShipFeePaymentDto> GetMemberFees(int memberId, FeeStatus? status = null)
        {
            var feePayments = _paymentRepository.GetAllFees()
                .Where(mfp => mfp.MemberId == memberId);

            if (status.HasValue)
            {
                feePayments = feePayments.Where(mfp => mfp.Status == status);
            }

            
            return MemberShipFeePaymentDto.CreateList(feePayments.ToList());
        }



        public float GetCurrentRatePrice() //metodo para precio actual de la cuota
        {
            var currentFee = _membershipFeeRepository.GetAll()
        .OrderByDescending(f => f.ExpirationDate)
        .FirstOrDefault();

            if (currentFee == null)
                throw new Exception("No se encontró ninguna cuota registrada");

            return currentFee.Price;
        }


    }
}


