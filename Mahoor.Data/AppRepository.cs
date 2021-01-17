using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ChefCode.Common.BaseModels;
using ChefCode.Common.Interfaces;
using ChefCode.Common.Repository;
using StackExchange.Redis;


namespace Mahoor.Data
{
    public class AppRepository<T, TId> : EfAsyncRepository<T, TId>, IAppRepository<T, TId> where T : BaseModel<TId>
    {
        private readonly IInMemoryRepository<T> _cacheDatabase;
        private readonly IDatabase _redis;

        public AppRepository(AppDbContext dbContext ,IInMemoryRepository<T> cacheDatabase) : base(dbContext)
        {
            _cacheDatabase = cacheDatabase;
        }


        public async Task<IReadOnlyList<T>> Where(Expression<Func<T, bool>> expression)
        {
            return await ListAsync(new GenericSpec<T, TId>(expression));
        }

       

    
    }


    public class GenericSpec<T, TId> : BaseSpecification<T, TId> where T : BaseModel<TId>
    {
        public GenericSpec(Expression<Func<T, bool>> criteria) : base(criteria)
        {
        }
    }
    public interface IAppRepository<T, TId> : IAsyncRepository<T, TId> where T : BaseModel<TId>
    {
        Task<IReadOnlyList<T>> Where(Expression<Func<T, bool>> expression);
    }
}
