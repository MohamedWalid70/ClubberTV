using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.Infrastructure.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClubberTV.DTOs.AuthDtos;

namespace ClubberTV.Controllers
{
    [Route("v1/clubber-tv/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IUserServices _userServices;
        IConfiguration _configuration;
        public AuthController(IUserServices userServices, IConfiguration configuration)
        {
            _userServices = userServices;
            _configuration = configuration;
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
                return BadRequest("Unauthorized Access");
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
                Token = jwtGenerator.Generate(user)
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
                return BadRequest("Unauthorized Access");
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
                Token = jwtGenerator.Generate(user)
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
                return BadRequest("Unauthorized Access");
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
                Token = jwtGenerator.Generate(user)
            };

            return Ok(authResponseDto);
        }

        //[HttpPost("out")]
        //public IActionResult Logout() {

        //    // Logout implementation
        //}
    }
}
