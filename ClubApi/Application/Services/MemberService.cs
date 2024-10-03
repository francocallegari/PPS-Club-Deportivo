using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Services
{
    public class MemberService : IMemberService
    {
        private readonly IUserService _userService;
        private readonly IEventService _eventService;

        public MemberService(IUserService userService, IEventService eventService)
        {
            _userService = userService;
            _eventService = eventService;
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

        //Un usuario puede anotarse a un evento
        public void SigUpEvent(int memberId, int eventId)
        {
            var response = _userService.GetUserById(memberId);
            if (response == null || response.UserType != "Member")
                throw new InvalidOperationException("No se encontró al miembro.");

            var member = new Member
            {
                Id = response.Id,
                Name = response.Name,
                Email = response.Email,
                UserType = response.UserType
            };

            var eventEntity = _eventService.GetEventById(eventId);
            if (eventEntity == null)
                throw new InvalidOperationException("No se encontró evento.");

            if (eventEntity.Members.Any(m => m.Id == member.Id))
                throw new InvalidOperationException("El miembro ya está inscrito en este evento.");

            eventEntity.Members.Add(member);

            /*var eventDto = new EventDto
            {
                Id = eventEntity.Id,
                Name = eventEntity.Name,
                Description = eventEntity.Description,
                Date = eventEntity.Date,
                Capacity = eventEntity.Capacity,
                Status = eventEntity.Status,
                Members = eventEntity.Members.Select(m => new MemberDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    Email = m.Email,
                }).ToList()
            };*/

            //_eventService.UpdateEvent(eventEntity.Id, eventDto);
            _eventService.UpdateEvent(eventEntity);
        }
    }
}
