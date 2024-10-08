﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepositorySport : IRepositoryBase<Sport>
    {
        Sport GetSportByName(string name);
        List<Member> GetAllMembers(int sportId);
    }
}
