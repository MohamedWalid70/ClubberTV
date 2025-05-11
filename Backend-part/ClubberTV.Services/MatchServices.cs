using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace ClubberTV.Services
{
    internal class MatchServices : IMatchServices
    {
        IRepository<Match> _matchRepo;

        public MatchServices(IRepository<Match> matchRepo)
        {
            _matchRepo = matchRepo;
        }

        public async ValueTask AddMatchAsync(Match match)
        {
           await _matchRepo.AddAsync(match);
           //return;
        }

        public void BeginUpdateMatch(Match match)
        {
            _matchRepo.BeginUpdate(match);
        }

        public async ValueTask<Match> GetMatchByIdAsync(Guid id)
        {
           return await _matchRepo.GetByIdAsync(id);
        }

        public IQueryable<Match> GetMatches()
        {
            return _matchRepo.GetAll();
        }

        public void RemoveMatch(Match match)
        {
            _matchRepo.Delete(match);
        }
    }
}
