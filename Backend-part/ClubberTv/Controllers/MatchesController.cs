using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.DTOs.MatchDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClubberTV.Controllers
{
    [Route("v1/clubber-tv/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly IMatchServices _matchesServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;

        public MatchesController(IMatchServices matchServices, IUnitOfWork unitOfWork, IMapper autoMapper)
        {
            _matchesServices = matchServices;
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("new")]
        public async ValueTask<IActionResult> AddMatch(AddedMatchDto matchInfo)
        {
            if (ModelState.IsValid)
            {

                Match addedMatch = _autoMapper.Map<Match>(matchInfo);

                await _matchesServices.AddMatchAsync(addedMatch);

                int addedEntries = await _unitOfWork.CommitAsync();

                if (addedEntries != 0)
                {
                    return Ok("A new match has been added successfully");
                }
                else
                {
                    return BadRequest("There is an error while adding the new match\nTry again later");
                }
                
            }

            return BadRequest();

        }


        [Authorize]
        [HttpGet("all")]
        public async ValueTask<IActionResult> GetMatches()
        {
            List<Match> matches = await _matchesServices.GetMatches().ToListAsync();

            List<MatchResponseDto> matchContracts = _autoMapper.Map<List<MatchResponseDto>>(matches);

            return Ok(matchContracts);
        }


        [Authorize]
        [HttpGet("specific-match/{id:guid}")]
        public async ValueTask<IActionResult> GetMatch([FromRoute] Guid id)
        {
            Match? match = await _matchesServices.GetMatchByIdAsync(id);

            if (match != null)
            {
                MatchResponseDto matchContract = _autoMapper.Map<MatchResponseDto>(match);

                return Ok(matchContract);
            }
            else
            {
                return NotFound();
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPatch("match-to-be-updated")]
        public async ValueTask<IActionResult> EditMatch(MatchOperationsDto matchInfo)
        {
            if (ModelState.IsValid)
            {
                Match match = await _matchesServices.GetMatchByIdAsync(matchInfo.Id);

                if (match != null)
                {

                    _matchesServices.BeginUpdateMatch(match);

                    match.Duration = matchInfo.Duration;
                    match.Status = matchInfo.Status;
                    match.Date = matchInfo.Date;
                    match.Title = matchInfo.Title;
                    match.Competition = matchInfo.Competition;

                    int commitResult = await _unitOfWork.CommitAsync();

                    if (commitResult != 0)
                    {
                        return Ok("The match has been updated successfully");
                    }
                    else
                    {
                        return Ok("Nothing has been updated\nTry again later if you really edited the match values");
                    }
                }
                else
                {
                    return NotFound("The match to be edited is not found");
                }
            }
            return BadRequest();
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("specific-match/{id:guid}")]
        public async ValueTask<IActionResult> RemoveMatch([FromRoute] Guid id)
        {
            Match? match = await _matchesServices.GetMatchByIdAsync(id);

            if (match != null)
            {
                _matchesServices.RemoveMatch(match);
                int commitResult = await _unitOfWork.CommitAsync();

                if (commitResult != 0)
                {
                    return Ok("The match has been deleted successfully");
                }
                else
                {
                    return BadRequest("There is an error while deleting the match\nTry again later");
                }
            }
            else
            {
                return NotFound("There is nothing to be deleted");
            }
        }
    }
}
