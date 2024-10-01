using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface INewsService
    {
        ICollection<News> GetAllNews();
        News GetNewsById(int id);
        News CreateNews(News news);
        void UpDateNews(News upDateNews);
        void DeleteNews(int id);
    }
}
