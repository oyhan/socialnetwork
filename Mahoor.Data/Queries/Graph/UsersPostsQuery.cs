using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.SocialGraph;

namespace Mahoor.Data.Queries.Graph
{
    public sealed class UsersPostsQuery : BaseSpecification<AssociationModel,Guid>
    {
        public UsersPostsQuery(Guid userId, in int requestFrom, in int requestTo)
        {
            AddCriteria(a=>a.Id1==userId && a.AssociationType== AType.Authored);
            ApplyOrderByDescending(c=>c.CreatedDate);
        }
    }
}
