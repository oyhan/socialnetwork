using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Post;

namespace Mahoor.Data.Queries.Timeline
{
    public sealed class GetUserTimelinePosts:BaseSpecification<PostModel,Guid>
    {
        public GetUserTimelinePosts(List<string> usersid, int from , int to)
        {
            AddInclude(p=>p.User);
            AddInclude(p=>p.Place);
            ApplyPaging(from, to);
            ApplyOrderByDescending(c=>c.CreatedDate);
            AddCriteria(p=> usersid.Contains(p.UserId));
        }
    }
}
