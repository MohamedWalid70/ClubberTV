using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ClubberTV.Core.Entities
{
    [ModelMetadataType(typeof(MatchBuddy))]
    public partial class Match
    {

    }
    public class MatchBuddy
    {
        [MaxLength(50, ErrorMessage = "Input exceeded the allowed length"), StringLength(50)]
        public required string Title { get; set; }

        [MaxLength(40, ErrorMessage = "Input exceeded the allowed length"), StringLength(40)]
        public required string Competition { get; set; }
    }
}
