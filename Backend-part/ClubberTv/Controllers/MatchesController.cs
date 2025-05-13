using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using ClubberTV.DTOs.MatchDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [Authorize(Roles = "Admin,SuperAdmin")]
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
                    return new StatusCodeResult(StatusCodes.Status201Created);
                }
                else
                {
                    // "There is an error while adding the new match\nTry again later"
                    return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                }
                
            }

            return BadRequest();

        }


        [HttpGet("all")]
        public async ValueTask<IActionResult> GetMatches()
        {
            List<Match> matches = await _matchesServices.GetMatches().ToListAsync();

            List<MatchOperationsDto> matchContracts = _autoMapper.Map<List<MatchOperationsDto>>(matches);

            return Ok(matchContracts);
        }


        [Authorize]
        [HttpGet("specific-match/{id:guid}")]
        public async ValueTask<IActionResult> GetMatch([FromRoute] Guid id)
        {
            Match? match = await _matchesServices.GetMatchByIdAsync(id);

            if (match != null)
            {
                MatchOperationsDto matchContract = _autoMapper.Map<MatchOperationsDto>(match);

                return Ok(matchContract);
            }
            else
            {
                return NotFound();
            }
        }


        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPatch("specific-match")]
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
                        return Ok();
                    }
                    else
                    {
                        return Accepted();
                    }
                }
                else
                {
                    return NotFound("The match to be edited is not found");
                }
            }
            return BadRequest();
        }


        [Authorize(Roles = "Admin,SuperAdmin")]
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
                    return Ok();
                }
                else
                {
                    //"There is an error while deleting the match\nTry again later"

                    return new StatusCodeResult(StatusCodes.Status500InternalServerError);
                }
            }
            else
            {
                return NotFound("There is nothing to be deleted");
            }
        }
    }
}
