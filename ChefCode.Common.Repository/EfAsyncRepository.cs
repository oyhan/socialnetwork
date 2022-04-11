using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using ChefCode.Common.BaseModels;
using ChefCode.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChefCode.Common.Repository
{
    public class EfAsyncRepository<T, TId> : IAsyncRepository<T, TId> where T : BaseModel<TId>
    {
        public DbContext _dbContext { get; set; }
        public DbSet<T> Table { get => _dbContext.Set<T>(); }

        public EfAsyncRepository(DbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public virtual async Task<T> GetByIdAsync(TId id)
        {
            return await this._dbContext.Set<T>().FindAsync((object)id);
        }

        public virtual Task<T> GetByIdAsync(TId id, Expression<Func<T, object>> includes)
        {
            return this._dbContext.Set<T>().Include<T, object>(includes).FirstOrDefaultAsync<T>((Expression<Func<T, bool>>)(s => s.Id.Equals((object)id)), new CancellationToken());
        }

        public virtual async Task<T> GetByIdAsync(TId id, params ISpecification<T>[] spec)
        {
            return await this.ApplySpecification(false, spec).FirstOrDefaultAsync<T>((Expression<Func<T, bool>>)(m => m.Id.Equals((object)id)), new CancellationToken());
        }

        public virtual async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return (IReadOnlyList<T>)await this._dbContext.Set<T>().ToListAsync<T>(new CancellationToken());
        }

        public virtual async Task<IReadOnlyList<T>> ListAsync(params ISpecification<T>[] spec)
        {
            return (IReadOnlyList<T>)await this.ApplySpecification(false, spec).ToListAsync<T>(new CancellationToken());
        }
        public virtual async Task<IReadOnlyList<TResult>> ListAsync<TResult>(Expression<Func<T, TResult>> selector,params ISpecification<T>[] spec)
        {
            return await this.ApplySpecification(false,selector ,spec).ToListAsync();
        }

        public virtual async Task<int> CountAsync(params ISpecification<T>[] spec)
        {
            return await this.ApplySpecification(true, spec).CountAsync<T>(new CancellationToken());
        }

        public Task<int> ApplyChangesAsync()
        {
            return this._dbContext.SaveChangesAsync(new CancellationToken());
        }

        public virtual async Task<T> AddAsync(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            this._dbContext.Set<T>().Add(entity);
            int num = await this._dbContext.SaveChangesAsync(new CancellationToken());
            return entity;
        }

        public virtual async Task UpdateAsync(T entity)
        {
            entity.LastModifiedDate = DateTime.Now;
            this._dbContext.Entry<T>(entity).State = EntityState.Modified;
            int num = await this._dbContext.SaveChangesAsync(new CancellationToken());
        }

        public virtual async Task DeleteAsync(T entity)
        {
            this._dbContext.Set<T>().Remove(entity);
            int num = await this._dbContext.SaveChangesAsync(new CancellationToken());
        }

        public virtual async Task DeleteByIdAsync(TId id)
        {
            await this.DeleteAsync(await this.GetByIdAsync(id));
        }

        private IQueryable<T> ApplySpecification(
          bool counting,

          params ISpecification<T>[] spec)
        {
            return SpecificationEvaluator<T, TId>.GetQuery(this._dbContext.Set<T>().AsQueryable<T>(), counting, spec);
        }

        private IQueryable<TResult> ApplySpecification<TResult>(
            bool counting,
            Expression<Func<T, TResult>> selector,
            params ISpecification<T>[] spec)
        {
            return SpecificationEvaluator<T, TId>.GetQuery<TResult>(this._dbContext.Set<T>().AsNoTracking().AsQueryable<T>(),  selector, counting, spec);
        }
    }
}
