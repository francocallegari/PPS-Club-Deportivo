using Application.Models;
using Domain.Interfaces;

namespace Infrastructure.Data
{
    public class RepositoryStatistics : IRepositoryStatistics
    {
        private readonly ApplicationContext _context;

        public RepositoryStatistics(ApplicationContext context)
        {
            _context = context;
        }

        public ICollection<PopularSportDto> GetPopularSports()
        {
            return _context.Sports
                .Select(s => new PopularSportDto
                {
                    SportName = s.Name,
                    MemberCount = s.Members.Count
                })
                .OrderByDescending(s => s.MemberCount)
                .ToList();
        }

        public ICollection<NewUsersDto> GetNewUsers()
        {
            return _context.Users
                .Where(u => u.UserRegistrationDate != null)
                .GroupBy(u => new { u.UserRegistrationDate.Year, u.UserRegistrationDate.Month })
                .Select(g => new NewUsersDto
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    UserCount = g.Count()
                })
                .OrderBy(g => g.Year).ThenBy(g => g.Month)
                .ToList();
        }

        public ICollection<PaymentStatusDto> GetPaymentStatus()
        {
            var totalMembers = _context.Members.Count();

            var membersUpToDate = _context.MembershipFeePayments
                .Where(p => p.PaymentDate >= DateTime.Now.AddMonths(-1))
                .Select(p => p.MemberId)
                .Distinct()
                .Count();

            var upToDatePercentage = (membersUpToDate / (double)totalMembers) * 100;
            var overduePercentage = 100 - upToDatePercentage;

            return new List<PaymentStatusDto>
            {
                new PaymentStatusDto
                {
                    UpToDatePercentage = upToDatePercentage,
                    OverduePercentage = overduePercentage
                }
            };
        }
    }
}
