using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Review;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Review.Commands;
using MediatR;

namespace Mahoor.Services.Review.Handlers
{
    class SearchRestaurantReviewsCommandHandler :IRequestHandler<SearchRestaurantReviewsCommand, BaseServiceResponse<List<RestaurantReviewItemDto>>>
    {
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;
        private readonly IGraphService _graphService;

        public SearchRestaurantReviewsCommandHandler(IAppRepository<ReviewModel , Guid> reviewRepository , IGraphService graphService)
        {
            _reviewRepository = reviewRepository;
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<List<RestaurantReviewItemDto>>> Handle(SearchRestaurantReviewsCommand request, CancellationToken cancellationToken)
        {
            var placeReviews = await _graphService.GetAssociationsTo(request.RestaurantId, AType.Wrote);
            var placeReviewStringIds = placeReviews.Select(r => r.ToString()).ToList();
            var tenFirstReviews = await _reviewRepository.ListAsync(r => new RestaurantReviewItemDto()
            {
                Rate = r.Rate,
                DateVisited = r.DateVisited,
                Description = r.Description,
                Title = r.Title,
                DateWritten = r.CreatedDate,
                UserAvatar = r.User.AvatarUrl,
                Writer = r.User.DisplayName,
                WriterUserName=r.User.UserName,
                WriterCity=r.User.CurrentCity,
                UserId=r.UserId,

            }, new GetRestaurantReviewsOrderedByDateVisitedDescQuery(request.RestaurantId, 0, 1000,request.Text));


            foreach (var reviewItemDto in tenFirstReviews)
            {
                reviewItemDto.NoOfReviews = placeReviewStringIds.Count(c => c == reviewItemDto.UserId);
            }

            return BaseServiceResponse<List<RestaurantReviewItemDto>>.SuccessFullResponse(tenFirstReviews.ToList());

        }
    }
}
