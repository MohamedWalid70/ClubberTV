using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ClubberTV.Core.Types.Types;

namespace ClubberTV.Core.Entities
{
    public partial class Match
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Competition { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public int Duration { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
