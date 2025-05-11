using ClubberTV.Core.Interfaces;
using ClubberTV.Infrastructure.Presistence;
using ClubberTV.Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ClubberTV.Infrastructure
{
    public static class InfrastructureRegisteration
    {
        public static void ResisterInfrastructureServices(this WebApplicationBuilder builder) 
        {
            builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
            builder.Services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddSingleton<JwtGenerator>();

        }
    }
}
