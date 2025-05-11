using System.ComponentModel.DataAnnotations;
using static ClubberTV.Core.Types.Types;

namespace ClubberTV.DTOs.MatchDtos
{
    public class MatchResponseDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Competition { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        public int Duration { get; set; }
    }
}
