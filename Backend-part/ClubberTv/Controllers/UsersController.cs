using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.Infrastructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Threading.Tasks;
using ClubberTV.DTOs.UserDtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ClubberTV.Controllers
{
    [Route("v1/clubber-tv/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;
        private readonly IClaimServices _claimServices;

        public UsersController(IUserServices userServices, IUnitOfWork unitOfWork, IMapper autoMapper, IClaimServices claimServices)
        {
            _userServices = userServices;
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
            _claimServices = claimServices;
        }

        
        [HttpPost("new-user")]
        public async ValueTask<IActionResult> AddUser(RegisteredUserDto userInfo)
        {
            if (ModelState.IsValid)
            {
                User? similarUser = await _userServices.GetUsers().FirstOrDefaultAsync(user => user.Username.Equals(userInfo.Username) || user.Email.Equals(userInfo.Email));

                if (similarUser == null)
                {
                    User newUser = new()
                    {
                        Email = userInfo.Email.ToLower(),
                        Name = userInfo.Name,
                        PhoneNumber = userInfo.PhoneNumber,
                        Password = await Cryptography.GetPasswordHash(userInfo.Password),
                        Username = userInfo.Username,
                        Role = "User"
                    };

                    await _userServices.AddUserAsync(newUser);

                    int addedEntries = await _unitOfWork.CommitAsync();

                    if (addedEntries != 0)
                    {
                        return Ok("A new user has been created successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while creating the new user\nTry again later");
                    }
                }
                else
                {
                    return BadRequest("The entered username or email is already taken\nTry different username");
                }
            }

            return BadRequest();

        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("new-admin")]
        public async ValueTask<IActionResult> AddAdmin(RegisteredUserDto userInfo)
        {
            if (ModelState.IsValid)
            {
                User? similarUser = await _userServices.GetUsers().FirstOrDefaultAsync(user => user.Username.Equals(userInfo.Username) || user.Email.Equals(userInfo.Email));

                if (similarUser == null)
                {
                    User newUser = new()
                    {
                        Email = userInfo.Email.ToLower(),
                        Name = userInfo.Name,
                        PhoneNumber = userInfo.PhoneNumber,
                        Password = await Cryptography.GetPasswordHash(userInfo.Password),
                        Username = userInfo.Username,
                        Role = "Admin"
                    };

                    await _userServices.AddUserAsync(newUser);

                    int addedEntries = await _unitOfWork.CommitAsync();

                    if (addedEntries != 0)
                    {
                        return Ok("A new admin has been created successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while creating the new admin\nTry again later");
                    }
                }
                else
                {
                    return BadRequest("The entered username or email is already taken\nTry different username");
                }
            }

            return BadRequest();

        }



        [Authorize(Roles = "Admin")]
        [HttpGet("all-users")]
        public async ValueTask<IActionResult> GetUsersByAdminPrivilege()
        {
            List<User> users = await _userServices.GetUsers().Where(user => user.Role.Equals("User")).
                ToListAsync();

            List<UserResponseDto> userContracts = _autoMapper.Map<List<UserResponseDto>>(users);

            return Ok(userContracts);
        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("all-admins-and-users")]
        public async ValueTask<IActionResult> GetUsers()
        {
            List<User> users = await _userServices.GetUsers().Where(user => !user.Role.Equals("SuperAdmin")).
                ToListAsync();

            List<UserResponseDto> userContracts = _autoMapper.Map<List<UserResponseDto>>(users);

            return Ok(userContracts);
        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("specific-user/{id:guid}")]
        public async ValueTask<IActionResult> GetUser([FromRoute] Guid id)
        {
            User? user = await _userServices.GetUserByIdAsync(id);

            if (user != null && !user.Role.Equals("SuperAdmin"))
            {
                UserResponseDto userContract = _autoMapper.Map<UserResponseDto>(user);
                
                return Ok(userContract);
            }
            else
            {
                return NotFound();
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPatch("admin-modification")]
        public async ValueTask<IActionResult> EditUserByAdminPrivilege(UpdatedUserDto userInfo)
        {
            if (ModelState.IsValid)
            {
                User user = await _userServices.GetUserByIdAsync(userInfo.Id);

                if (user != null && user.Role.Equals("User"))
                {   
                    _userServices.BeginUpdateUser(user);

                    user.Email = userInfo.Email.ToLower();
                    user.Name = userInfo.Name;
                    user.PhoneNumber = userInfo.PhoneNumber;
                    user.Password = await Cryptography.GetPasswordHash(userInfo.Password);
                    user.Id = userInfo.Id;

                    int commitResult = await _unitOfWork.CommitAsync();

                    if (commitResult != 0)
                    {
                        return Ok("The user has been updated successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while updating the user\nTry again later");
                    }
                }
                else
                {
                    return NotFound("The user does not exist");
                }
            }
            return BadRequest();
        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpPatch("super-admin-modification")]
        public async ValueTask<IActionResult> EditUserBySuperAdminPrivilege(UpdatedUserDto userInfo)
        {
            if (ModelState.IsValid)
            {
                User user = await _userServices.GetUserByIdAsync(userInfo.Id);

                if (user != null && !user.Role.Equals("SuperAdmin"))
                {
                    _userServices.BeginUpdateUser(user);

                    user.Email = userInfo.Email.ToLower();
                    user.Name = userInfo.Name;
                    user.PhoneNumber = userInfo.PhoneNumber;
                    user.Password = await Cryptography.GetPasswordHash(userInfo.Password);
                    user.Id = userInfo.Id;

                    int commitResult = await _unitOfWork.CommitAsync();

                    if (commitResult != 0)
                    {
                        return Ok("The user has been updated successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while updating the user\nTry again later");
                    }
                }
                else
                {
                    return NotFound("The user does not exist");
                }
            }
            return BadRequest();
        }



        [Authorize(Roles = "Admin,User,SuperAdmin")]
        [HttpPatch("user-modification")]
        public async ValueTask<IActionResult> UpdateUserByLoggedInPrivilege(ModifiedUserDto userInfo)
        {
            if (ModelState.IsValid)
            {
                if (Guid.TryParse(_claimServices.GetUserClaim(ClaimTypes.NameIdentifier), out Guid userId))
                {
                    User user = await _userServices.GetUserByIdAsync(userId);

                    if (user != null)
                    {

                        _userServices.BeginUpdateUser(user);

                        user.Email = userInfo.Email.ToLower();
                        user.Name = userInfo.Name;
                        user.PhoneNumber = userInfo.PhoneNumber;
                        user.Password = await Cryptography.GetPasswordHash(userInfo.Password);

                        int commitResult = await _unitOfWork.CommitAsync();

                        if (commitResult != 0)
                        {
                            return Ok("The user has been updated successfully");
                        }
                        else
                        {
                            return BadRequest("There is an error while updating the user\nTry again later");
                        }
                    }
                    else
                    {
                        return NotFound("The user does not exist");
                    }
                }
                return NotFound("You're logged out\nplease, login and then, proceed with the operation");
            }
            return BadRequest();
        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("specific-admin-or-user/{id:guid}")]
        public async ValueTask<IActionResult> RemoveUserBySuperAdminPrivilege([FromRoute] Guid id)
        {
            User? user = await _userServices.GetUserByIdAsync(id);

            if (user != null)
            {
                if (!user.Role.Equals("SuperAdmin"))
                {
                    _userServices.RemoveUser(user);
                    int commitResult = await _unitOfWork.CommitAsync();

                    if (commitResult != 0)
                    {
                        return Ok("The user has been updated successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while deleting the user\nTry again later");
                    }
                }
                else
                {
                    return BadRequest("No such privilege for such an action");
                }
            }
            else
            {
                return NotFound();
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("specific-user/{id:guid}")]
        public async ValueTask<IActionResult> RemoveUserByAdminPrivilege([FromRoute] Guid id)
        {
            User? user = await _userServices.GetUserByIdAsync(id);

            if (user != null)
            {
                if (user.Role.Equals("User"))
                {
                    _userServices.RemoveUser(user);
                    int commitResult = await _unitOfWork.CommitAsync();

                    if (commitResult != 0)
                    {
                        return Ok("The user has been updated successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while deleting the user\nTry again later");
                    }
                }
                else
                {
                    return BadRequest("No such privilege for such an action");
                }
            }
            else
            {
                return NotFound();
            }
        }

    }
}
