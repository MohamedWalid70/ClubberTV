using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.DTOs.MatchDtos;
using ClubberTV.DTOs.PlaylistDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ClubberTV.Controllers
{
    [Authorize]
    [Route("v1/clubber-tv/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        private readonly IPlaylistServices _playlistServices;
        private readonly IMatchServices _matchServices;
        private readonly IUserServices _userServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;
        private readonly IClaimServices _claimServices;

        public PlaylistsController(IPlaylistServices playlistServices, IUnitOfWork unitOfWork, IMapper autoMapper, IMatchServices matchServices, IUserServices userServices, IClaimServices claimServices)
        {
            _userServices = userServices;
            _playlistServices = playlistServices;
            _matchServices = matchServices;
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
            _claimServices = claimServices;
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost("addition")]
        public async ValueTask<IActionResult> AddPlaylistItem(MatchOperationsDto matchInfo)
        {
            if (ModelState.IsValid)
            {
                string? id = _claimServices.GetUserClaim(ClaimTypes.NameIdentifier);

                if (Guid.TryParse(id, out Guid userId))
                {
                    PlaylistItem duplicateItem = await _playlistServices.GetPlaylistItemByIdsAsync(userId, matchInfo.Id);

                    User user = await _userServices.GetUserByIdAsync(userId);

                    Match match = await _matchServices.GetMatchByIdAsync(matchInfo.Id);

                    if (user == null || match == null)
                    {
                        return NotFound("One of the provided inputs does not exist");
                    }


                    if (duplicateItem == null)
                    {

                        PlaylistItem addedPlaylistItem = new()
                        {
                            MatchId = matchInfo.Id,
                            UserId = userId,
                        };

                        await _playlistServices.AddPlaylistItem(addedPlaylistItem);

                        int addedEntries = await _unitOfWork.CommitAsync();

                        if (addedEntries != 0)
                        {
                            return Ok();
                        }
                        else
                        {
                            return BadRequest("There is an error while adding the new item Try again later");
                        }

                    }
                    else
                    {
                        // "The item you're trying to add does already exist"
                        return Accepted();
                    }
                }
                return UnprocessableEntity("Invalid user token");
                
            }

            return BadRequest();

        }


        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpGet("all")]
        public async ValueTask<IActionResult> GetPlaylistItems()
        {
            List<PlaylistItem> playlistItems = await _playlistServices.GetPlaylistsItems().ToListAsync();

            return Ok(playlistItems);
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet("user-playlist")]
        public async ValueTask<IActionResult> GetUserPlaylist()
        {
            string? id = _claimServices.GetUserClaim(ClaimTypes.NameIdentifier);

            if (Guid.TryParse(id, out Guid userId))
            {
                User user = await _userServices.GetUserByIdAsync(userId);

                if (user == null)
                {
                    return NotFound("The user doesn't exist");
                }

                List<MatchOperationsDto> userPlaylist = await _playlistServices.GetPlaylistsItems().
                    Where(playlistItem => playlistItem.UserId == userId).
                    Join(_matchServices.GetMatches(), playlistItem => playlistItem.MatchId,
                        match => match.Id, (playlistItem, match) => new MatchOperationsDto
                        {
                            Id = match.Id,
                            Title = match.Title,
                            Competition = match.Competition,
                            Date = match.Date,
                            Duration = match.Duration,
                            Status = match.Status

                        }).ToListAsync();

                return Ok(userPlaylist);
            }
            return UnprocessableEntity("Invalid user token");
        }


        [Authorize(Roles = "Admin,User")]
        [HttpDelete("user-playlist-item/{id:guid}")]
        public async ValueTask<IActionResult> RemovePlaylistItem([FromRoute] Guid id)
        {
            string? userId = _claimServices.GetUserClaim(ClaimTypes.NameIdentifier);

            if (Guid.TryParse(userId, out Guid targetUserId))
            {
                PlaylistItem playlistItemToBeDeleted = await _playlistServices.GetPlaylistItemByIdsAsync(targetUserId, id);

                if (playlistItemToBeDeleted != null)
                {
                    _playlistServices.RemovePlaylistItem(playlistItemToBeDeleted);

                    int commitResult = await _unitOfWork.CommitAsync();

                    if (commitResult != 0)
                    {
                        return Ok();
                    }
                    else
                    {
                        // "There was an error while removing the playlist item\nTry again later"
                        return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                    }
                }
                else
                {
                    return NotFound("There is nothing to be removed from the playlist");
                }
            }
            return UnprocessableEntity("Invalid user token");
        }
    }
}
