using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ChefCode.Common.BaseModels;

namespace ChefCode.Common.Interfaces
{
    
    public interface IAsyncRepository<T, TId> where T : BaseModel<TId>
    {
       

       
        Task<T> GetByIdAsync(TId id);

       
        Task<T> GetByIdAsync(TId id, Expression<Func<T, object>> includes);

        
        Task<T> GetByIdAsync(TId id, params ISpecification<T>[] spec);

       
        Task<IReadOnlyList<T>> GetAllAsync();

        
        Task<IReadOnlyList<T>> ListAsync(params ISpecification<T>[] spec);

        Task<IReadOnlyList<TResult>> ListAsync<TResult>(Expression<Func<T, TResult>> selector,params ISpecification<T>[] spec);

        
        Task<T> AddAsync(T entity);

       
        Task UpdateAsync(T entity);

        
        Task DeleteAsync(T entity);

        
        Task DeleteByIdAsync(TId id);

        
        Task<int> CountAsync(params ISpecification<T>[] spec);

        
        Task<int> ApplyChangesAsync();
    }
}