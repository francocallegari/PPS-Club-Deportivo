using Application.Models.Response;

namespace Application.Interfaces
{
    public interface IEmailService
    {
        void SendWelcomeEmail(UserResponse user);
    }
}
