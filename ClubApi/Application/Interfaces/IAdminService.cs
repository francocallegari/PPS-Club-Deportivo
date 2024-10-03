﻿using Application.Models;
using Application.Models.Request;
using Application.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAdminService
    {
        ICollection<UserResponse> GetAllAdmins();
        UserResponse GeAdminById(int id);
        void UpDateAdmin(int id, UserRequest adminRequest);
        void DeleteAdmin(int id);
        void CreateAdmin(UserRequest adminRequest);
        void PostNews(int idAdmin, NewsDto newsDto);
        void PostEvent(int idAdmin, EventDto eventDto);
    }
}