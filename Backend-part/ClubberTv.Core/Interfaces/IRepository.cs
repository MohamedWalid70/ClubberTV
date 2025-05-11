using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubberTV.Core.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity);

        IQueryable<TEntity> GetAll();

        ValueTask<TEntity> GetByIdAsync(params Guid[] ids);

        EntityEntry<TEntity> BeginUpdate(TEntity entity);

        EntityEntry<TEntity> Delete(TEntity entity);

    }
}
