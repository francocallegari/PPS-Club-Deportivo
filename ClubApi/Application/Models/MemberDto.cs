using Domain.Entities;

namespace Application.Models
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public List<SportDto> SportsAttended { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string DNI { get; set; }
        public string Address { get; set; }

        public static MemberDto Create(Member member)
        {
            var dto = new MemberDto();
            dto.Id = member.Id;
            dto.UserName = member.UserName;
            dto.Name = member.Name;
            dto.Email = member.Email;
            if (member.SportsAttended != null)
            {
                dto.SportsAttended = SportDto.CreateList(member.SportsAttended);
            } else { dto.SportsAttended = null; }
            dto.Address = member.Address;
            dto.DateOfBirth = member.DateOfBirth;
            dto.DNI = member.DNI;
            

            return dto;
        }

        public static List<MemberDto> CreateList(List<Member> members)
        {
            List<MemberDto> listDto = [];
            foreach (var m in members)
            {
                listDto.Add(Create(m));
            }

            return listDto;
        }

        //public static Member CreateFromDto(MemberDto dto)
        //{
        //    return new Member
        //    {
        //        SportsAttended = CreateListFromDto(dto.SportsAttended),
        //    };
        //}

        //public static List<Member> CreateListFromDto(List<MemberDto> memberDtos)
        //{
        //    List<Member> members = new List<Member>();
        //    foreach (var dto in memberDtos)
        //    {
        //        members.Add(CreateFromDto(dto));
        //    }

        //    return members;
        //}
    }
}
