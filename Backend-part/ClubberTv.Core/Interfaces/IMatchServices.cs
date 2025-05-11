using ClubberTV.Core.Entities;

namespace ClubberTV.Core.Interfaces
{
    public interface IMatchServices
    {
        ValueTask AddMatchAsync(Match match);
        ValueTask<Match> GetMatchByIdAsync(Guid id);
        IQueryable<Match> GetMatches();
        void BeginUpdateMatch(Match match);
        void RemoveMatch(Match match);

    }
}
