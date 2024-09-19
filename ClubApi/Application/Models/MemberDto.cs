using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public List<SportDto> SportsAttended { get; set; }

        public static MemberDto Create(Member member)
        {
            var dto = new MemberDto();
            dto.Id = member.Id;
            dto.UserName = member.UserName;
            dto.Name = member.Name;
            dto.Email = member.Email;
            dto.SportsAttended = SportDto.CreateList(member.SportsAttended);

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
    }
}
