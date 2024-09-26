using Application.Models;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISportsService
    {
        //ICollection<SportDto> GetAllSports();
        SportDto GetSportByName(string name);
        ICollection<Member> GetAllMembers();
        //SportDto CreateSport(SportDto sport);
        //void DeleteSport(int id);
    }
}
