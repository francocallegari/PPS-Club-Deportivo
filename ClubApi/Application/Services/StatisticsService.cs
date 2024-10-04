using Application.Interfaces;
using Application.Models;
using Domain.Interfaces;

namespace Application.Services
{
    public class StatisticsService:IStatisticsService
    {
        private readonly IRepositoryStatistics _repositoryStatistics;

        public StatisticsService(IRepositoryStatistics repositoryStatistics)
        {
            _repositoryStatistics = repositoryStatistics;
        }

        public ICollection<PopularSportDto> GetPopularSports()
        {
            return _repositoryStatistics.GetPopularSports();
        }

        public ICollection<NewUsersDto> GetNewUsers()
        {
            return _repositoryStatistics.GetNewUsers();
        }

        public ICollection<PaymentStatusDto> GetPaymentStatus()
        {
            return _repositoryStatistics.GetPaymentStatus();
        }
    }
}
