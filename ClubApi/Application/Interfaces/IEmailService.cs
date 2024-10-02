namespace Application.Interfaces
{
    public interface IEmailService
    {
        string GetTemplateByName(string template);
        void SendEmail(string toEmail, string subject, string body);
    }
}
