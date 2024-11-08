using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class MemberService : IMemberService
    {
        private readonly IUserService _userService;
        private readonly IEventService _eventService;
        private readonly IRepositoryUser _repositoryUser;

        public MemberService(IUserService userService, IEventService eventService, IRepositoryUser repositoryUser)
        {
            _userService = userService;
            _eventService = eventService;
            _repositoryUser = repositoryUser;
        }

        public ICollection<UserResponse> GetAllMembers()
        {
            return _userService.GetAllUsers().Where(u => u.UserType == "Member").ToList();
        }

        public MemberDto GetMemberById(int id)
        {
            var member = _repositoryUser.GetMemberById(id);
            if (member.UserType.Equals("Member", StringComparison.OrdinalIgnoreCase)) ;
            return MemberDto.Create(member);
        }

        public void UpDateMember(int id, MemberDto dto)
        {
            var existingMember = _repositoryUser.GetMemberById(id)
                ?? throw new InvalidOperationException("No se encontro Member");

            _repositoryUser.Update(existingMember);
        }

        public void DeleteMember(int id)
        {
            var existingMember = _userService.GetUserById(id);
            if (existingMember.UserType.Equals("Member", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo se pueden eliminar socios.");

            _userService.DeleteUser(id);
        }

        public void CreateMmeber(UserRequest memberRequest)
        {
            if (memberRequest.UserType.Equals("Member", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("El tipo de usuario debe ser socio.");

            _userService.CreateUser(memberRequest);
        }
    }
}
