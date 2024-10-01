using Application.Models;
using Application.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ITSessionService
    {
        List<TrainingSessionDto> GetTSbyCoachId(int id);
        TrainingSessionDto CreateTS(TSessionRequest tsDto);
        void UpdateTS(int sessionID, TSessionRequest tsDto);
        void DeleteTS(int sessionID);
    }
}
