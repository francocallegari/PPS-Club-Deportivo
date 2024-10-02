using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class RepositoryNews : RepositoryBase<News>, IRepositoryNews
    {
        private readonly ApplicationContext _context;
        public RepositoryNews(ApplicationContext context) : base(context)
        {
            _context = context;
        }

        public ICollection<News> GetNewsByDate(DateTime date)
        {
            var newByDate = _context.News.Where(n => n.PublicationDate.Date == date.Date).ToList();

            if (newByDate.Count == 0)
            {
                throw new Exception("No se encontraron noticias en la fecha proporcionada.");
            }

            return newByDate;
        }

        public ICollection<News> GetNewsByTitle(string title)
        {
            var newsByTitle = _context.News.Where(n => n.Title.Contains(title)).ToList();
            
            return newsByTitle;
        }
    }
}
