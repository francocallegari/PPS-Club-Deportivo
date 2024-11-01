using Domain.Entities;

namespace Application.Models
{
    public class SportDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string ImageURL { get; set; }

        public static SportDto Create(Sport sport)
        {
            var dto = new SportDto();
            dto.Id = sport.Id;
            dto.Name = sport.Name;
            dto.Capacity = sport.Capacity;
            dto.ImageURL = sport.ImageURL;

            return dto;
        }

        public static List<SportDto> CreateList(List<Sport> sports)
        {
            List<SportDto> listDto = [];
            foreach (var s in sports)
                listDto.Add(Create(s));

            return listDto;
        }

        public static Sport From(SportDto dto)
        {
            var sport      = new Sport();
            sport.Id       = dto.Id;
            sport.Name     = dto.Name;
            sport.Capacity = dto.Capacity;

            return sport;
        }
    }
}
