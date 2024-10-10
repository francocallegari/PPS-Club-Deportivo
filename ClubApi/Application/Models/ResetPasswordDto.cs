﻿using System.ComponentModel.DataAnnotations;

public class ResetPasswordDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Password2 { get; set; }
}
