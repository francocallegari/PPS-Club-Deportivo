using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class RepositoryMembershipFee : EfRepository<MembershipFee>, IRepositoryMembershipFee
    {
        public RepositoryMembershipFee(ApplicationContext context) : base(context)
        {
        }
        public void UpdateFeesPrice(float newPrice)
        {
            var latestFee = _context.MembershipFees.OrderByDescending(f => f.ExpirationDate).FirstOrDefault();

            var newFeeExpirationDate = latestFee?.ExpirationDate.AddMonths(1) ?? DateTime.Today;

            var newFee = new MembershipFee();
            newFee.ExpirationDate = newFeeExpirationDate;
            newFee.Price = newPrice;

            _context.MembershipFees.Add(newFee);
            _context.SaveChanges();

            float additionalSportPercentage = 0.20f; // 20% adicional por deporte

            var members = _context.Members.Include(m => m.SportsAttended).ToList();
            foreach (var member in members)
            {
                float feePrice = newFee.Price;

                // Ajustar el precio basado en el número de deportes
                int sportCount = member.SportsAttended.Count;
                feePrice += feePrice * additionalSportPercentage * sportCount;

                var payment = new MembershipFeePayment
                {
                    MemberId = member.Id,
                    Member = member,
                    FeeId = newFee.Id,
                    Fee = newFee,
                    Price = feePrice,
                    Status = FeeStatus.Pending,
                    PaymentDate = null
                };
                _context.MembershipFeePayments.Add(payment);
            }

            _context.SaveChanges();
        }

        public void GenerateFeeForNewMember(User user)
        {
            var latestFee = _context.MembershipFees.OrderByDescending(f => f.ExpirationDate).FirstOrDefault();
            if (latestFee == null)
            {
                throw new InvalidOperationException("No existe una cuota de membresía disponible.");
            }

            var payment = new MembershipFeePayment
            {
                MemberId = user.Id,
                Member = (Member)user,
                FeeId = latestFee.Id,
                Fee = latestFee,
                Price = latestFee.Price,
                Status = FeeStatus.Paid,
                PaymentDate = DateTime.Now
            };
            _context.MembershipFeePayments.Add(payment);
            _context.SaveChanges();
        }
    }
}
