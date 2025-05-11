using ClubberTV.Core.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ClubberTV.Services
{
    public static class ServicesRegisteration
    {
        public static void RegisterServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<IUserServices, UserServices>();
            builder.Services.AddTransient<IMatchServices, MatchServices>();
            builder.Services.AddTransient<IPlaylistServices, PlaylistServices>();
            builder.Services.AddTransient<IClaimServices, ClaimServices>();
        }
    }
}
