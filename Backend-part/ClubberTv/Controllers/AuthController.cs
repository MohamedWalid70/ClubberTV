using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.Infrastructure.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClubberTV.DTOs.AuthDtos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ClubberTV.Controllers
{
    [Route("v1/clubber-tv/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IUserServices _userServices;
        IConfiguration _configuration;
        IClaimServices _claimServices;
        public AuthController(IUserServices userServices, IConfiguration configuration, IClaimServices claimServices)
        {
            _userServices = userServices;
            _configuration = configuration;
            _claimServices = claimServices;
        }

        [HttpPost("user-in")]
        public async ValueTask<IActionResult> Login(AuthDto userCredentials)
        {
            User? user = await _userServices.GetUsers().FirstOrDefaultAsync(user => user.Email.Equals(userCredentials.Email));

            if (user == null)
            {
                return BadRequest("Invalid Email or password");
            }

            if (!user.Role.Equals("User"))
            {
                return Unauthorized("Unauthorized Access");
            }

            string password = await Cryptography.GetPasswordHash(userCredentials.Password);

            if (!password.Equals(user.Password))
            {
                return BadRequest("Invalid Email or password");
            }

            JwtGenerator jwtGenerator = new(_configuration);

            AuthResponseDto authResponseDto = new()
            {
                Name = user.Name,
                Token = jwtGenerator.Generate(user),
                Role = user.Role
            };

            return Ok(authResponseDto);
        }

        [HttpPost("admin-in")]
        public async ValueTask<IActionResult> AdminLogin(AuthDto userCredentials)
        {
            User? user = await _userServices.GetUsers().FirstOrDefaultAsync(user => user.Email.Equals(userCredentials.Email));

            if (user == null)
            {
                return BadRequest("Invalid Email or password");
            }

            if (!user.Role.Equals("Admin"))
            {
                return Unauthorized("Unauthorized Access");
            }

            string password = await Cryptography.GetPasswordHash(userCredentials.Password);

            if (!password.Equals(user.Password))
            {
                return BadRequest("Invalid Email or password");
            }

            JwtGenerator jwtGenerator = new(_configuration);

            AuthResponseDto authResponseDto = new()
            {
                Name = user.Name,
                Token = jwtGenerator.Generate(user),
                Role = user.Role
            };

            return Ok(authResponseDto);
        }


        [HttpPost("super-admin-in")]
        public async ValueTask<IActionResult> SuperAdminLogin(AuthDto userCredentials)
        {
            User? user = await _userServices.GetUsers().FirstOrDefaultAsync(user => user.Email.Equals(userCredentials.Email));

            if (user == null)
            {
                return BadRequest("Invalid Email or password");
            }

            if (!user.Role.Equals("SuperAdmin"))
            {
                return Unauthorized("Unauthorized Access");
            }

            string password = await Cryptography.GetPasswordHash(userCredentials.Password);

            if (!password.Equals(user.Password))
            {
                return BadRequest("Invalid Email or password");
            }

            JwtGenerator jwtGenerator = new(_configuration);

            AuthResponseDto authResponseDto = new()
            {
                Name = user.Name,
                Token = jwtGenerator.Generate(user),
                Role = user.Role
            };

            return Ok(authResponseDto);
        }


        [Authorize]
        [HttpGet("refresh")]
        public async ValueTask<IActionResult> Recognize()
        {
            string? id = _claimServices.GetUserClaim(ClaimTypes.NameIdentifier);
            
            if(Guid.TryParse(id, out Guid userId))
            {
                User user = await _userServices.GetUserByIdAsync(userId);

                AuthResponseDto authResponseDto = new() { Name = user.Name, Role = user.Role, Token = "" };

                return Ok(authResponseDto);

            }
            return UnprocessableEntity("Invalid user");
        }

        //[HttpPost("out")]
        //public IActionResult Logout() {

        //    // Logout implementation
        //}
    }
}
