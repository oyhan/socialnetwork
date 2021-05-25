using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Post;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Data.Queries.Post
{
   public sealed class GetLastPostsOfCityQuery : BaseSpecification<PostModel,Guid>
    {
        public GetLastPostsOfCityQuery(Guid cityId,int from , int to)
        {
            AddCriteria(p => p.CityId == cityId);
            ApplyOrderByDescending(p => p.CreatedDate);
            ApplyPaging(from, to);
        }
    }
}
