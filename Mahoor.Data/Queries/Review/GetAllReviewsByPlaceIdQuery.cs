using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Review;

namespace Mahoor.Data.Queries.Review
{
    public class GetAllReviewsByPlaceIdQuery : BaseSpecification<ReviewModel,Guid>
    {
        public GetAllReviewsByPlaceIdQuery(Guid placeId)
        {
            AddCriteria(r=>r.PlaceId==placeId);
        }
    }
}
