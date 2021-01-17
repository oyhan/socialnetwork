using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mahoor.Data
{
    public interface IInMemoryRepository<TEntity>
    {
        Task AddAsync(TEntity entity);
        Task<TEntity> GetAsync(Guid id);
    }
}
