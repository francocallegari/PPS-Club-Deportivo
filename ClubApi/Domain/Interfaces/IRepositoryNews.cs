using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepositoryNews : IRepositoryBase<News>
    {
        ICollection<News> GetNewsByDate(DateTime date);
        ICollection<News> GetNewsByTitle(string title);

        News GetNewsById(int id);
    }
}
