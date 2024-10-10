using Application.Models.Response;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IEmailService
    {
        void SendWelcomeEmail(UserResponse user);

        void SendForgotPassword(User user, string url);
    }
}
