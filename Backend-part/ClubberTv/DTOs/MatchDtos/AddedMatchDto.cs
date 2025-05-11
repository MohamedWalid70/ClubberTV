using static ClubberTV.Core.Types.Types;
using System.ComponentModel.DataAnnotations;

namespace ClubberTV.DTOs.MatchDtos
{
    public class AddedMatchDto
    {
        [Required(ErrorMessage = "Title field is required")]
        [MaxLength(50, ErrorMessage = "Input exceeded the allowed length")]
        public required string Title { get; set; }

        [Required(ErrorMessage = "Competition field is required")]
        [MaxLength(40, ErrorMessage = "Input exceeded the allowed length")]
        public required string Competition { get; set; }

        [Required(ErrorMessage = "Date field is required")]
        public DateTime? Date { get; set; }

        [Required(ErrorMessage = "Status field is required")]
        public Status? Status { get; set; }

        [Required(ErrorMessage = "Duration field is required")]
        public int? Duration { get; set; }
    }
}
