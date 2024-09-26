using Application.Models.Request;
using Application.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMemberService
    {
        ICollection<UserResponse> GetAllMembers();
        UserResponse GetMemberById(int id);
        void UpDateMember(int id, UserRequest memberRequest);
        void DeleteMember(int id);
        void CreateMmeber(UserRequest memberRequest);
        void SigUpEvent(int memberId, int eventId);
    }
}
