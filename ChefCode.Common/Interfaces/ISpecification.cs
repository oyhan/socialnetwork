using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ChefCode.Common.Interfaces
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }

        string CriteriaString { get; }

        List<Expression<Func<T, object>>> Includes { get; }

        List<string> IncludeStrings { get; }

        IList<Expression<Func<T, object>>> OrderBy { get; }

        List<string> OrderByString { get; }

        Expression<Func<T, object>> OrderByDescending { get; }

        List<string> OrderByDescendingString { get; }

        Expression<Func<T, object>> GroupBy { get; }

        string GroupByString { get; }

        int Take { get; }

        int Skip { get; }

        bool IsPagingEnabled { get; }
        
    }
}