using static ClubberTV.Core.Types.Types;
using System.ComponentModel.DataAnnotations;

namespace ClubberTV.DTOs.MatchDtos
{
    public class MatchOperationsDto
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(50, ErrorMessage = "Input exceeded the allowed length")]
        public required string Title { get; set; }

        [MaxLength(40, ErrorMessage = "Input exceeded the allowed length")]
        public required string Competition { get; set; }

        [Required(ErrorMessage = "")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "")]
        public int Status { get; set; }

        [Required(ErrorMessage = "")]
        public int Duration { get; set; }
    }
}
