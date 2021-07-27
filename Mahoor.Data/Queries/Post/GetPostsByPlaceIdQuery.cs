using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Post;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Data.Queries.Post
{
   public sealed class GetPostsByCityIdQuery : BaseSpecification<PostModel,Guid>
    {
        public GetPostsByCityIdQuery(Guid cityId)
        {
            AddCriteria(p => p.CityId == cityId);
            ApplyOrderByDescending(p => p.CreatedDate);
            ApplyPaging(0, 1);
        }
    }
}
