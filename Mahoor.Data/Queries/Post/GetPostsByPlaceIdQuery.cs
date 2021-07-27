using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Post;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Data.Queries.Post
{
   public sealed class GetPostsByPlaceIdQuery : BaseSpecification<PostModel,Guid>
    {
        public GetPostsByPlaceIdQuery(Guid placeId)
        {
            AddCriteria(p => p.PlaceId == placeId);
            ApplyOrderByDescending(p => p.CreatedDate);
            AddInclude(r=>r.Medias);

        }
    }
}
