using Application.Models;

namespace Application.Interfaces
{
    public interface IStatisticsService
    {
        ICollection<PopularSportDto> GetPopularSports();
        ICollection<NewUsersDto> GetNewUsers();
        ICollection<PaymentStatusDto> GetPaymentStatus();
    }
}
