using Application.Models;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISportsService
    {
        //ICollection<SportDto> GetAllSports();
        SportDto GetSportByName(string name);
        List<MemberDto> GetAllMembers(int sportId);
        //SportDto CreateSport(SportDto sport);
        //void DeleteSport(int id);
    }
}
