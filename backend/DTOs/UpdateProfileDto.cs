using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UpdateProfileDto
    {
        [Required(ErrorMessage = "Prénom requis")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nom requis")]
        public string LastName { get; set; } = string.Empty;
    }
}