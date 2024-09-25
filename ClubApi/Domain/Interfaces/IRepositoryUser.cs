using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepositoryUser : IRepositoryBase<User>
    {
        User GetUserByName(string username);
        User GetUserByEmail(string email);
    }
}
