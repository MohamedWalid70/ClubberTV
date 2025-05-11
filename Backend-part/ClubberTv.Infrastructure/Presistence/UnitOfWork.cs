
using ClubberTV.Core.Interfaces;
using ClubberTV.Infrastructure.Presistence.Data;

namespace ClubberTV.Infrastructure.Presistence
{
    public class UnitOfWork : IUnitOfWork
    {
        AppDbContext _appDbContext;
        public UnitOfWork(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async ValueTask<int> CommitAsync()
        {
            return await _appDbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _appDbContext.Dispose();
        }
    }
}
