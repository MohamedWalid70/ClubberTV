using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.DTOs.MatchDtos;
using ClubberTV.DTOs.PlaylistDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        public PlaylistsController(IPlaylistServices playlistServices, IUnitOfWork unitOfWork, IMapper autoMapper, IMatchServices matchServices, IUserServices userServices)
        {
            _userServices = userServices;
            _playlistServices = playlistServices;
            _matchServices = matchServices;
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        [HttpPost("addition")]
        public async ValueTask<IActionResult> AddPlaylistItem(PlaylistItemOperations playlistItem)
        {
            if (ModelState.IsValid)
            {
                PlaylistItem addedPlaylistItem = _autoMapper.Map<PlaylistItem>(playlistItem);

                PlaylistItem duplicateItem = await _playlistServices.GetPlaylistItemByIdsAsync(addedPlaylistItem.UserId, addedPlaylistItem.MatchId);

                User user = await _userServices.GetUserByIdAsync(addedPlaylistItem.UserId);

                Match match = await _matchServices.GetMatchByIdAsync(addedPlaylistItem.MatchId);

                if(user == null || match == null)
                {
                    return BadRequest("One of the provided inputs does not exist");
                }
              

                if (duplicateItem == null)
                {

                    await _playlistServices.AddPlaylistItem(addedPlaylistItem);

                    int addedEntries = await _unitOfWork.CommitAsync();

                    if (addedEntries != 0)
                    {
                        return Ok("The playlist item has been added successfully");
                    }
                    else
                    {
                        return BadRequest("There is an error while adding the new item\nTry again later");
                    }

                }
                else
                {
                    return BadRequest("The item you're trying to add does already exist");
                }
            }

            return BadRequest();

        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async ValueTask<IActionResult> GetPlaylistItems()
        {
            List<PlaylistItem> playlistItems = await _playlistServices.GetPlaylistsItems().ToListAsync();

            return Ok(playlistItems);
        }

        [HttpGet("specific-playlist/{id:guid}")]
        public async ValueTask<IActionResult> GetUserPlaylist([FromRoute] Guid id)
        {
            User user = await _userServices.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound("The user doesn't exist");
            }

            List<MatchResponseDto> userPlaylist = await _playlistServices.GetPlaylistsItems().
                Where(playlistItem => playlistItem.UserId == id).
                Join(_matchServices.GetMatches(), playlistItem => playlistItem.MatchId,
                    match => match.Id, (playlistItem, match) => new MatchResponseDto
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


        [HttpDelete("specific-playlist-item")]
        public async ValueTask<IActionResult> RemovePlaylistItem(PlaylistItem playlistItem)
        {
            PlaylistItem playlistItemToBeDeleted = await _playlistServices.GetPlaylistItemByIdsAsync(playlistItem.UserId, playlistItem.MatchId);

            if (playlistItemToBeDeleted != null)
            {
                _playlistServices.RemovePlaylistItem(playlistItemToBeDeleted);

                int commitResult = await _unitOfWork.CommitAsync();

                if (commitResult != 0)
                {
                    return Ok("The match has been removed successfully from the playlist");
                }
                else
                {
                    return BadRequest("There was an error while removing the playlist item\nTry again later");
                }
            }
            else
            {
                return NotFound("There is nothing to be removed from the playlist");
            }
        }
    }
}
