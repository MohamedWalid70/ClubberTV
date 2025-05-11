using System.ComponentModel.DataAnnotations;

namespace ClubberTV.DTOs.PlaylistDtos
{
    public class PlaylistItemOperations
    {
        [Required(ErrorMessage = "UserId field is required")]
        public Guid? UserId { get; set; }

        [Required(ErrorMessage = "MatchId field is required")]
        public Guid? MatchId { get; set; }
    }
}
