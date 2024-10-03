using Application.Interfaces;
using Application.Models;
using Application.Models.Response;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;
        private readonly EmailTemplateSettings _emailTemplateSettings;

        public EmailService(IOptions<EmailTemplateSettings> emailTemplateSettings)
        {
            _smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("allstarsclubofficial@gmail.com", "secvelhiybdfiulr"),
                EnableSsl = true
            };
            _fromEmail = "allstarsclubofficial@gmail.com";
            _smtpClient.UseDefaultCredentials = false;
            _emailTemplateSettings = emailTemplateSettings.Value;
        }

        public void SendWelcomeEmail(UserResponse user)
        {
            string subject = "Bienvenido a All Stars Club";
            string template = GetTemplateByName("WelcomeEmail");
            string emailBody = String.Format(template, user.Name, user.UserRegistrationDate);

            SendEmail(user.Email, subject, emailBody);
        }

        private string GetTemplateByName(string template)
        {
            if (_emailTemplateSettings.Templates.TryGetValue(template, out var templateBody))
                return templateBody;

            return "Template no encontrado";
        }

        private void SendEmail(string toEmail, string subject, string body)
        {
            var mailMessage = new MailMessage(_fromEmail, toEmail, subject, body)
            {
                IsBodyHtml = true
            };
            _smtpClient.Send(mailMessage);
        }
    }
}
