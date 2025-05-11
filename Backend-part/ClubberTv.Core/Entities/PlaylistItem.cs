using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClubberTV.Core.Entities
{
    public class PlaylistItem
    {
        public Guid UserId { get; set; }
        public Guid MatchId { get; set; }
    }
}
