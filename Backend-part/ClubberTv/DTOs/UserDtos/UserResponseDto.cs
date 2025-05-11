namespace ClubberTV.DTOs.UserDtos
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
