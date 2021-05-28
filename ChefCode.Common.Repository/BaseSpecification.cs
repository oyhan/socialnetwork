﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Linq.Expressions;
using ChefCode.Common.Interfaces;

namespace ChefCode.Common.Repository
{
	public abstract class BaseSpecification<T, TId> : ISpecification<T>
	{
		protected BaseSpecification(Expression<Func<T, bool>> criteria)
		{
			this.Criterias.Add(criteria);
		}

		protected BaseSpecification()
		{
		}

		protected BaseSpecification(string criteria)
		{
			this.CriteriaString = criteria;
		}

		public List<Expression<Func<T, bool>>> Criterias { get; private set; } = new List<Expression<Func<T, bool>>>();

		public string CriteriaString { get; private set; }

		public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

		public List<string> IncludeStrings { get; } = new List<string>();

		public IList<Expression<Func<T, object>>> OrderBy { get; private set; } = new List<Expression<Func<T, object>>>();

		public List<string> OrderByString { get; } = new List<string>();

		public Expression<Func<T, object>> OrderByDescending { get; private set; }

		public List<string> OrderByDescendingString { get; } = new List<string>();

		public Expression<Func<T, object>> GroupBy { get; private set; }

		public string GroupByString { get; private set; }

		public int Take { get; private set; }

		public int Skip { get; private set; }

		public bool IsPagingEnabled { get; private set; }

		protected virtual void AddInclude(Expression<Func<T, object>> includeExpression)
		{
			this.Includes.Add(includeExpression);
		}

		protected virtual void AddInclude(string includeString)
		{
			this.IncludeStrings.Add(includeString);
		}

		protected virtual void AddCriteriaString(string criteria)
		{
			this.CriteriaString = criteria;
		}

		protected virtual void AddCriteria(Expression<Func<T, bool>> criteria)
		{
			this.Criterias.Add(criteria);
		}

		protected virtual void ApplyPaging(int skip, int take)
		{
			this.Skip = skip;
			this.Take = take;
			this.IsPagingEnabled = true;
		}

		protected virtual void ApplyOrderBy(Expression<Func<T, object>> orderByExpression)
		{
			OrderBy.Add( orderByExpression);
		}

		protected virtual void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression)
		{
			this.OrderByDescending = orderByDescendingExpression;
		}

		protected virtual void ApplyOrderByDescending(string orderbyDescendingString)
		{
			this.OrderByDescendingString.Add(orderbyDescendingString);
		}

		protected virtual void ApplyOrderBy(string orderByString)
		{
			this.OrderByString.Add(orderByString);
		}

		protected virtual void ApplyGroupBy(Expression<Func<T, object>> groupByExpression)
		{
			this.GroupBy = groupByExpression;
		}

		protected virtual void ApplyGroupBy(string groupBy)
		{
			this.GroupByString = groupBy;
		}
	}
}
