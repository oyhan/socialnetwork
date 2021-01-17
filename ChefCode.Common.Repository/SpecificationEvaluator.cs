using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Security.Cryptography;
using ChefCode.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChefCode.Common.Repository
{
    public class SpecificationEvaluator<T, TId> where T : class
    {
        public static IQueryable<T> GetQuery(
          IQueryable<T> inputQuery,
          bool counting = false,

          params ISpecification<T>[] specifications)
        {
            IQueryable<T> queryable = inputQuery;
            foreach (ISpecification<T> specification in specifications)
            {
                
                if (specification.Criteria != null)
                    queryable = queryable.Where<T>(specification.Criteria);
                else if (specification.CriteriaString != null)
                    queryable = queryable.Where(specification.CriteriaString);
                IQueryable<T> seed = specification.Includes.Aggregate<Expression<Func<T, object>>, IQueryable<T>>(queryable, (Func<IQueryable<T>, Expression<Func<T, object>>, IQueryable<T>>)((current, include) => (IQueryable<T>)current.Include<T, object>(include)));
                queryable = specification.IncludeStrings.Aggregate<string, IQueryable<T>>(seed, (Func<IQueryable<T>, string, IQueryable<T>>)((current, include) => current.Include<T>(include)));

                if (specification.OrderBy != null && specification.OrderBy.Count>0)
                {
                    queryable = queryable.OrderBy(specification.OrderBy[0]);
                    foreach (var orderbyPerdicate in specification.OrderBy.Skip(1))
                    {
                        queryable = ((IOrderedQueryable<T>) queryable).ThenBy(orderbyPerdicate);
                    }
                }
                   
                    
                else if (specification.OrderByDescending != null)
                    queryable = (IQueryable<T>)queryable.OrderBy<T, object>(specification.OrderByDescending);
                else if (specification.OrderByString.Count > 0)
                {
//                    queryable = (IQueryable<T>)DynamicQueryableExtensions.OrderBy<T>((IQueryable<M0>)queryable, specification.OrderByString[0], Array.Empty<object>());
                    queryable = queryable.OrderBy(specification.OrderByString[0]);
                    foreach (string str in specification.OrderByString.Skip<string>(1))
                        queryable = ((IOrderedQueryable<T>) queryable).ThenBy(str);
                }
                if (specification.OrderByDescendingString.Count > 0)
                {
                    queryable = queryable.OrderBy(specification.OrderByDescendingString[0] + " descending");
                    foreach (string str in specification.OrderByDescendingString.Skip<string>(1))
                        queryable = ((IOrderedQueryable<T>) queryable).ThenBy(str + " descending");
                }
                if (specification.GroupBy != null)
                    queryable = queryable.GroupBy<T, object>(specification.GroupBy).Select<IGrouping<object, T>, T>((Expression<Func<IGrouping<object, T>, T>>)(x => x.First<T>()));
                else if (specification.GroupByString != null)
                    queryable = (IQueryable<T>)DynamicQueryableExtensions.Select(DynamicQueryableExtensions.GroupBy((IQueryable)queryable, specification.GroupByString, Array.Empty<object>()), "first()", Array.Empty<object>());
                if (specification.IsPagingEnabled && !counting)
                    queryable = queryable.Skip<T>(specification.Skip).Take<T>(specification.Take);

            }
           
            return queryable;
        }

        public static IQueryable<TResult> GetQuery<TResult>(
            IQueryable<T> inputQuery,
            Expression<Func<T, TResult>> selector ,
            bool counting = false,

            params ISpecification<T>[] specifications)
        {

            return GetQuery(inputQuery,  counting,specifications).Select(selector);
        }
    }
}
