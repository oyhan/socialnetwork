using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.SocialGraph;

namespace Mahoor.Data.Queries.Graph
{
    public sealed class GetUserFollowingsPosts:BaseSpecification<AssociationModel,Guid>
    {
        public GetUserFollowingsPosts(List<Guid> followingsIds)
        {
            //find posts authored by the users list
            AddCriteria(a => followingsIds.Contains(a.Id1) && a.AssociationType == AType.Authored );
            ApplyOrderByDescending(p=>p.CreatedDate);
        }
    }
}
