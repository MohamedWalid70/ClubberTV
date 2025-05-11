using System.ComponentModel.DataAnnotations;

namespace ClubberTV.DTOs.AuthDtos
{
    public class AuthDto
    {
        [Required(ErrorMessage = "Email field is required")]
        [EmailAddress(ErrorMessage = "Invalid email"), MaxLength(30, ErrorMessage = "Input exceeded the allowed length")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MaxLength(40, ErrorMessage = "Input exceeded the allowed length"), MinLength(6, ErrorMessage = "Input is below the minimum length")]
        public required string Password { get; set; }

    }
}
