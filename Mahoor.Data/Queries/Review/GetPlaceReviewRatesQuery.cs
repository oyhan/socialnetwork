using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Review;

namespace Mahoor.Data.Queries.Review
{
   public sealed class GetPlaceReviewRatesQuery : BaseSpecification<ReviewModel,Guid>
    {
        public GetPlaceReviewRatesQuery(Guid placeId)
        {
            AddCriteria(r=>r.PlaceId== placeId);
            
        }
    }
}
