using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Humanizer;
using Mahoor.Data;
using Mahoor.Data.Queries.Review;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Extensions;

namespace Mahoor.Services.Place.Handlers
{
    class GetRestaurantDetailedCommandHandler : IRequestHandler<GetRestaurantDetailedCommand, BaseServiceResponse<RestaurantDetailDto>>
    {
        private readonly IAppRepository<RestaurantModel, Guid> _restaurantRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;
        private readonly IGraphService _graphService;

        public GetRestaurantDetailedCommandHandler(IAppRepository<RestaurantModel, Guid> restaurantRepository,IHttpContextAccessor httpContextAccessor, IAppRepository<ReviewModel, Guid> reviewRepository,IGraphService _graphService)
        {
            _restaurantRepository = restaurantRepository;
            _httpContextAccessor = httpContextAccessor;
            _reviewRepository = reviewRepository;
            this._graphService = _graphService;
        }
        public async Task<BaseServiceResponse<RestaurantDetailDto>> Handle(GetRestaurantDetailedCommand request, CancellationToken cancellationToken)
        {
            var restaurant = await _restaurantRepository.GetByIdAsync(request.RestaurantId);
            if (restaurant==null)
            {
                return BaseServiceResponse<RestaurantDetailDto>.FailedResponse("invalid placeId");
            }
            var noOfReviews = await _reviewRepository.CountAsync(new GetAllReviewsByPlaceIdQuery(request.RestaurantId));

            var favorite =
             await   _graphService.HasAssociation(_httpContextAccessor.HttpContext.User.Id(), request.RestaurantId.ToString(), AType.Faved);

            var userLocation = new Point(request.Lon, request.Lat);
            var tenFirstReviews =await _reviewRepository.ListAsync(r => new RestaurantReviewItemDto()
            {
                Rate = r.Rate,
                DateVisited = r.DateVisited,
                Description = r.Description,
                Title = r.Title,
                DateWritten = r.CreatedDate,
                UserAvatar = r.User.AvatarUrl,
                Writer = r.User.DisplayName,
                WriterUserName = r.User.UserName
            }, new GetRestaurantReviewsOrderedByDateVisitedDescQuery(restaurant.Id, 0, 10));
            var detailedDto = new RestaurantDetailDto()
            {
                Name = restaurant.Name,
                Location = restaurant.Location.Coordinates.Select(c => $"[{c.Y},{c.X}]").FirstOrDefault(),
                Website = restaurant["website"],
                Address = $"{restaurant["addr:city"]},{restaurant["addr:street"]}",
                Cuisine = restaurant["cuisine"].Replace(";", ","),
                Telephone = string.IsNullOrEmpty(restaurant["phone"]) && string.IsNullOrEmpty(restaurant["phone"]) ? "ثبت نشده" : $"{restaurant["phone"]},{restaurant["addr:housenumber"]}",
                DistanceToUser = restaurant.Location.GetDistance(userLocation),
                IsOpenNow = restaurant.IsOpenNow,
                NoOfReviews = noOfReviews,
                Reviews = tenFirstReviews.ToList(),
                Rate = restaurant.Rate,
                Favorite = favorite

            };
            return BaseServiceResponse<RestaurantDetailDto>.SuccessFullResponse(detailedDto);
        }
    }
    
}
