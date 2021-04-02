using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Review;
using Microsoft.EntityFrameworkCore;

namespace Mahoor.Data.Queries.Review
{
   public sealed class GetRestaurantReviewsOrderedByDateVisitedDescQuery:BaseSpecification<ReviewModel,Guid>
    {
        public GetRestaurantReviewsOrderedByDateVisitedDescQuery(Guid restaurantId, int from,int to)
        {
            AddCriteria(r=>r.PlaceId == restaurantId);
            ApplyPaging(from , to);
            ApplyOrderByDescending(r=>r.DateVisited);
            AddInclude(r=>r.Medias);
            
        }
        public GetRestaurantReviewsOrderedByDateVisitedDescQuery(Guid restaurantId, int from, int to , string textSearch)
        {
            AddCriteria(r => r.PlaceId == restaurantId && ( 
                                                            r.Description.SimilarSearch(textSearch) 
                                                            || r.Title.SimilarSearch(textSearch)));
            ApplyPaging(from, to);
            ApplyOrderBy(r => EF.Functions.PgroongaScore());

        }
    }
}
