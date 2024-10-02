using Application.Interfaces;
using Application.Models;
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

        public void UpDateNews(int id, NewsDto news) 
        {
            var existingNews = _repositoryNews.GetById(id);
            if (existingNews == null)
                throw new KeyNotFoundException("No se encontró la noticia con ese ID.");

            var newsWithSameTitle = _repositoryNews.GetNewsByTitle(news.Title).FirstOrDefault(n => n.Id != id);
            if (newsWithSameTitle != null)
                throw new InvalidOperationException("La noticia con el mismo título ya existe.");

            existingNews.Title = news.Title;
            existingNews.Description = news.Description;
            existingNews.ImageUrl = news.ImageUrl;
            existingNews.PublicationDate = news.PublicationDate;

            _repositoryNews.Update(existingNews);
        }

        public void DeleteNews(int id)
        {
            var news = _repositoryNews.GetById(id);
            if(news == null)
                throw new KeyNotFoundException("No se encontro la noticia con ese ID.");
            _repositoryNews.Delete(news);
        }

        public News GetNewsByTitle(string title)
        {
            var newsList = _repositoryNews.GetNewsByTitle(title);
            return newsList.FirstOrDefault();
        }
    }
}
