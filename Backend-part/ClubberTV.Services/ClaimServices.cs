using ClubberTV.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ClubberTV.Services
{
    public class ClaimServices : IClaimServices
    {
        IHttpContextAccessor _httpContextAccessor;
        public ClaimServices(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? GetUserClaim(string claimType)
        {

            var identity = _httpContextAccessor?.HttpContext?.User?.Identity as ClaimsIdentity;

            if (identity != null)
            {
                //if(Guid.TryParse(identity.FindFirst(claimType)?.Value, out Guid userId))
                //{
                //    return userId;
                //}
                return identity.FindFirst(claimType)?.Value;
                
            }
            return null;
        }

        
    }
}
