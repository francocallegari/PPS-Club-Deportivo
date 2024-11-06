using Application.Models;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISportsService
    {
        ICollection<SportDto> GetAllSports();
        SportDto GetSportByName(string name);
        List<MemberDto> GetAllMembers(int sportId);
        SportDto CreateSport(SportDto sport);
        void UpdateSport(int id, SportDto sport);
        void DeleteSport(int id);
        void SignUpSport(int sportId, int memberId);
        void DropOutSport(int sportId, int memberId);
        SportDto GetByCoachId(int coachId);
    }
}
