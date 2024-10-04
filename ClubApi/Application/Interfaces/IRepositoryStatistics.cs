using Application.Models;

namespace Domain.Interfaces
{
    public interface IRepositoryStatistics
    {
        ICollection<PopularSportDto> GetPopularSports();
        ICollection<NewUsersDto> GetNewUsers();
        ICollection<PaymentStatusDto> GetPaymentStatus();
    }
}
