using Application.Interfaces;
using System.Net;
using System.Net.Mail;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;

        public EmailService()
        {
            _smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("allstarsclubofficial@gmail.com", "secvelhiybdfiulr"),
                EnableSsl = true
            };
            _fromEmail = "allstarsclubofficial@gmail.com";
            _smtpClient.UseDefaultCredentials = false;
        }

        public void SendEmail(string toEmail, string subject, string body)
        {
            var mailMessage = new MailMessage(_fromEmail, toEmail, subject, body)
            {
                IsBodyHtml = true
            };
            _smtpClient.Send(mailMessage);
        }
    }
}
