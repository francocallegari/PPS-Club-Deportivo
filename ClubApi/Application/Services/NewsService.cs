using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class NewsService : INewsService
    {
        private readonly IRepositoryNews _repositoryNews;

        public NewsService(IRepositoryNews repositoryNews)
        {
            _repositoryNews = repositoryNews;
        }

        public ICollection<News> GetAllNews()
        {
            return _repositoryNews.GetAll();
        }

        public News GetNewsById(int id)
        {
            var news = _repositoryNews.GetById(id);
            if (news == null)
                throw new KeyNotFoundException("No se encontro la noticia con ese ID.");

            return news;
        }

        public News CreateNews(News news)
        {
            return _repositoryNews.Add(news);
        }

        public void UpDateNews(News upDateNews) 
        { 
            _repositoryNews.Update(upDateNews);
        }

        public void DeleteNews(int id)
        {
            var news = _repositoryNews.GetById(id);
            if(news == null)
                throw new KeyNotFoundException("No se encontro la noticia con ese ID.");
            _repositoryNews.Delete(news);
        }
    }
}
