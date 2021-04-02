using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Review;

namespace Mahoor.Data.Queries.Review
{
    public sealed class GetPlaceReviewRatesSeparatelyQuery : BaseSpecification<ReviewModel, Guid>
    {
        public GetPlaceReviewRatesSeparatelyQuery(Guid placeId)
        {
            AddCriteria(r => r.PlaceId == placeId);
        }

    }


}
