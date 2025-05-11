using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubberTV.Core.Interfaces
{
    public interface IClaimServices
    {
        string? GetUserClaim(string claimType);
    }
}
