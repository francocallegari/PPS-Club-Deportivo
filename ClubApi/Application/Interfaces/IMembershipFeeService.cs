﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMembershipFeeService
    {
        void UpdateFeesPrice(float price);
        void UpdateFeeStatus(int id);
    }
}
