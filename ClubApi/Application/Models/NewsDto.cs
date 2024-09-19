using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class NewsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime PublicationDate { get; set; }
        public static NewsDto Create(News news)
        {
            var dto = new NewsDto();
            dto.Id = news.Id;
            dto.Title = news.Title;
            dto.Description = news.Description;
            dto.ImageUrl = news.ImageUrl;
            dto.PublicationDate = news.PublicationDate;

            return dto;

        }

        public static List<NewsDto> CreateList(List<News> news)
        {
            List<NewsDto> listDto = [];
            foreach (var n in news)
            {
                listDto.Add(Create(n));
            }

            return listDto;
        }
    }
}
