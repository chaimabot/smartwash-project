using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class ResetPasswordDto
    {
        [Required(ErrorMessage = "Token de réinitialisation requis")]
        public string Token { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nouveau mot de passe requis")]
        [MinLength(6, ErrorMessage = "Mot de passe min 6 caractères")]
        public string NewPassword { get; set; } = string.Empty;
    }
}