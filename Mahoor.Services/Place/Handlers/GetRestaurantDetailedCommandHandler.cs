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
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Extensions;

namespace Mahoor.Services.Place.Handlers
{
    class GetRestaurantDetailedCommandHandler : IRequestHandler<GetRestaurantDetailedCommand, BaseServiceResponse<RestaurantDetailDto>>
    {
        private readonly IAppRepository<RestaurantModel, Guid> _restaurantRepository;
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;

        public GetRestaurantDetailedCommandHandler(IAppRepository<RestaurantModel, Guid> restaurantRepository, IAppRepository<ReviewModel, Guid> reviewRepository)
        {
            _restaurantRepository = restaurantRepository;
            _reviewRepository = reviewRepository;
        }
        public async Task<BaseServiceResponse<RestaurantDetailDto>> Handle(GetRestaurantDetailedCommand request, CancellationToken cancellationToken)
        {
            var restaurant = await _restaurantRepository.GetByIdAsync(request.RestaurantId);

            //            restaurant.Friday = new ScheduleModel()
            //            {
            //                Evenings = "18:00-22:00",
            //                Mornings = "8:00-13:00"
            //            };
            //            await _restaurantRepository.UpdateAsync(restaurant);

            //            var restarurants = await _restaurantRepository.Where(c => c.Friday.Evenings== "18:00-22:00");
            //            var restarurants = await _restaurantRepository.Where(c=>EF.Functions.JsonExistAll(c.Attributes, "name"));
            //            var restarurants = await _restaurantRepository.Where(c=>c.Attributes.RootElement.GetProperty("amenity").GetString()=="cafe" ||
            //                                                                    c.Attributes.RootElement.GetProperty("amenity").GetString() == "restaurant"||
            //                                                                    c.Attributes.RootElement.GetProperty("amenity").GetString() == "fast_food");
            var userLocation = new Point(request.Lon, request.Lat);
            var tenFirstReviews =await _reviewRepository.ListAsync(r => new RestaurantReviewItemDto()
            {
                Rate = r.Rate,
                DateVisited = r.DateVisited,
                Description = r.Description,
                Title = r.Title,
                DateWritten = r.CreatedDate,
                UserAvatar = r.User.AvatarUrl,
                Writer = r.User.DisplayName
            }, new GetRestaurantReviewsOrderedByDateVisitedDescQuery(restaurant.Id, 0, 10));
            var detailedDto = new RestaurantDetailDto()
            {
                Name = restaurant.Name,
                Location = restaurant.Location.ToText(),
                Website = restaurant["website"],
                Address = $"{restaurant["addr:city"]},{restaurant["addr:street"]}",
                Cuisine = restaurant["cuisine"].Replace(";", ","),
                Telephone = $"{restaurant["phone"]},{restaurant["addr:housenumber"]}",
                DistanceToUser = restaurant.Location.GetDistance(userLocation),
                IsOpenNow = restaurant.IsOpenNow,
                NoOfReviews = restaurant.Reviews?.Count,
                Reviews = tenFirstReviews.ToList()
            };
            return BaseServiceResponse<RestaurantDetailDto>.SuccessFullResponse(detailedDto);
        }
    }
}
