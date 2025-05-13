using System.ComponentModel.DataAnnotations;

namespace ClubberTV.DTOs.UserDtos
{
    public class UpdatedUserDto
    {
        [Required]
        public Guid Id { get; set; }

        [StringLength(35), RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "Invalid name")]
        [MaxLength(35, ErrorMessage = "Input exceeded the allowed length"), MinLength(2, ErrorMessage = "Input is below the minimum length")]
        public string? Name { get; set; }

        [StringLength(40), RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$", ErrorMessage = "Invalid password")]
        [MaxLength(40, ErrorMessage = "Input exceeded the allowed length"), MinLength(6, ErrorMessage = "Input is below the minimum length")]
        public string? Password { get; set; }


        [EmailAddress(ErrorMessage = "Invalid email"), MaxLength(30, ErrorMessage = "Input exceeded the allowed length"), StringLength(30)]
        public string? Email { get; set; }

        [Phone(ErrorMessage = "Phone Number must consist of numbers only"), MaxLength(15, ErrorMessage = "Input exceeded the allowed length"), StringLength(15)]
        public string? PhoneNumber { get; set; }

    }
}
