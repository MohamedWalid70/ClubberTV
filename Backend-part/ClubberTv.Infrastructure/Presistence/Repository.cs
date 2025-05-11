using ClubberTV.Core.Interfaces;
using ClubberTV.Infrastructure.Presistence.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ClubberTV.Infrastructure.Presistence
{
    internal class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        AppDbContext _appDbContext;
        DbSet<TEntity> _dbSet;

        public Repository(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
            _dbSet = _appDbContext.Set<TEntity>();
        }

        public async ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity)
        {
            return await _dbSet.AddAsync(entity);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public async ValueTask<TEntity> GetByIdAsync(params Guid[] ids)
        {
            return await _dbSet.FindAsync([..ids]);
        }

        public EntityEntry<TEntity> BeginUpdate(TEntity entity)
        {
            return _dbSet.Attach(entity);
        }

        public EntityEntry<TEntity> Delete(TEntity entity)
        {
            return _dbSet.Remove(entity);
        }

    }
}
