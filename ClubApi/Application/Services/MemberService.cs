using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;

namespace Application.Services
{
    public class MemberService : IMemberService
    {
        private readonly IUserService _userService;

        public MemberService(IUserService userService)
        {
            _userService = userService;
        }

        public ICollection<UserResponse> GetAllMembers()
        {
            return _userService.GetAllUsers().Where(u => u.UserType == "Member").ToList();
        }

        public UserResponse GetMemberById(int id)
        {
            var member = _userService.GetUserById(id);
            if (member.UserType.Equals("Member", StringComparison.OrdinalIgnoreCase))
                throw new KeyNotFoundException("No se encontró un socio con ese ID.");
            return member;
        }

        public void UpDateMember(int id, UserRequest memberRequest)
        {
            var existingMember = _userService.GetUserById(id);
            if (existingMember.UserType.Equals("Member", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Solo se pueden actualizar socios.");

            _userService.UpdateUser(id, memberRequest);
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
