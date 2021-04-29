using Mahoor.Data;
using Mahoor.Data.Queries.Place;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Mahoor.Services.Place.Handlers
{
    public class GetFavoritesByUserIdCommandHandler : IRequestHandler<GetFavoritesByUserIdCommand, BaseServiceResponse<List<RestaurantDetailDto>>>
    {
        private readonly IGraphService _graphService;
        private readonly IAppRepository<RestaurantModel, Guid> _restaurantRepository;
        private readonly ILocationService _locationService;

        public GetFavoritesByUserIdCommandHandler(IGraphService graphService, IAppRepository<RestaurantModel, Guid> restaurantRepository
            , ILocationService locationService)
        {
            _graphService = graphService;
            _restaurantRepository = restaurantRepository;
            _locationService = locationService;
        }
        public async Task<BaseServiceResponse<List<RestaurantDetailDto>>> Handle(GetFavoritesByUserIdCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var allFavoriteLocations = await _graphService.GetAssociationsFrom(request.UserId, AType.Faved);

                var userLocation = _locationService.RequesterLocation;
                Func<bool> favoriteMock = () => true;
                var restaurants = await _restaurantRepository.ListAsync(r => new RestaurantDetailDto()
                {
                    Name = r.Name,
                    //Location = r.Location.Coordinates.Select(c => $"[{c.Y},{c.X}]").FirstOrDefault(),
                    Website = r["website"],
                    Address = $"{r["addr:city"]},{r["addr:street"]}",
                    //Cuisine = r["cuisine"].Replace(";", ","),
                    //Telephone = string.IsNullOrEmpty(r["phone"]) && string.IsNullOrEmpty(r["phone"]) ? "ثبت نشده" : $"{r["phone"]},{r["addr:housenumber"]}",
                    DistanceInMeter = r.Location.Distance(userLocation),
                    IsOpenNow = r.IsOpenNow,
                    NoOfReviews = r.Reviews.Count,
                    Rate = r.Rate,
                    Favorite = true,
                    Id = r.Id
                },
                    new RestaurantGetByLocationIdsQuery(allFavoriteLocations, userLocation, request.From, request.To));

                return BaseServiceResponse<List<RestaurantDetailDto>>.SuccessFullResponse(restaurants.ToList());
            }
            catch (Exception ex)
            {

                Log.Logger.Fatal("exception in fetching favorite places {ex}", ex);
                return BaseServiceResponse<List<RestaurantDetailDto>>.FailedResponse("exception in fetching favorite places");
            }
        }
    }
}
