using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class ForgotPasswordDto
    {
        [Required(ErrorMessage = "Email requis")]
        [EmailAddress(ErrorMessage = "Email invalide")]
        public string Email { get; set; } = string.Empty;
    }
}