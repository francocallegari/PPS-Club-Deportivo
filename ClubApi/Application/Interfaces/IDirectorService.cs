using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IDirectorService
    {
        ICollection<UserResponse> GetAllDirectors();
        UserResponse GetDirectorById(int id);
        void UpdateDirector(int id, UserRequest directorRequest);
        void DeleteDirector(int id);
        void CreateDirector(UserRequest directorRequest);

    }
}
