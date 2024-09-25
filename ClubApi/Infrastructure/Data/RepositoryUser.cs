using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class RepositoryUser : RepositoryBase<User>, IRepositoryUser
    {
        private readonly ApplicationContext _context;
        public RepositoryUser(ApplicationContext context) : base(context)
        {
            _context = context;
        }

        public User GetUserByName(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == username)
                ?? throw new Exception("Usuario no encontrado");
            return user;
        }

        public User GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email)
                ?? throw new Exception("Usuario no encontrado");
            return user;
        }
    }
}
