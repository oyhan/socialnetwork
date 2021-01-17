using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Review;
using Mahoor.DomainObjects.Review;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Review.Commands;
using MediatR;

namespace Mahoor.Services.Review.Handlers
{
    class SearchRestaurantReviewsCommandHandler :IRequestHandler<SearchRestaurantReviewsCommand, BaseServiceResponse<List<RestaurantReviewItemDto>>>
    {
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;

        public SearchRestaurantReviewsCommandHandler(IAppRepository<ReviewModel , Guid> reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }
        public async Task<BaseServiceResponse<List<RestaurantReviewItemDto>>> Handle(SearchRestaurantReviewsCommand request, CancellationToken cancellationToken)
        {
            var tenFirstReviews = await _reviewRepository.ListAsync(r => new RestaurantReviewItemDto()
            {
                Rate = r.Rate,
                DateVisited = r.DateVisited,
                Description = r.Description,
                Title = r.Title,
                DateWritten = r.CreatedDate,
                UserAvatar = r.User.AvatarUrl,
                Writer = r.User.DisplayName
            }, new GetRestaurantReviewsOrderedByDateVisitedDescQuery(request.RestaurantId, 0, 10,request.Text));


            return BaseServiceResponse<List<RestaurantReviewItemDto>>.SuccessFullResponse(tenFirstReviews.ToList());

        }
    }
}
