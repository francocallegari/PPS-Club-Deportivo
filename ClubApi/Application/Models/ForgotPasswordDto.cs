using System.ComponentModel.DataAnnotations;

namespace Application.Models
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
