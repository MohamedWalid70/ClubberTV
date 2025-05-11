using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubberTV.Core.Entities
{
    public partial class User
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
        public ICollection<Match> Matches { get; set; } = new List<Match>();

    }
}
