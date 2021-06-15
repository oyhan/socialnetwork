using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Infrastructure;
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;
using Microsoft.Extensions.Options;
using NetTopologySuite.Geometries;
using Serilog;

namespace Mahoor.Services.Place.Commands
{
    public class GetBestRestaurantsCommandHandler : IRequestHandler<GetBestRestaurantsCommand, BaseServiceResponse<List<RestaurantDto>>>
    {
        private readonly ILocationService _locationService;
        private readonly IPlaceService _placeService;
        private readonly AppSettings _settings;

        public GetBestRestaurantsCommandHandler(IPlaceService placeService,ILocationService locationService,IOptionsSnapshot<AppSettings> options)
        {
            _locationService = locationService;
            _placeService = placeService;
            _settings = options.Value;
        }
        public async Task<BaseServiceResponse<List<RestaurantDto>>> Handle(GetBestRestaurantsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var point = _locationService.RequesterLocation as Point;

                var restarunts = await _placeService.GetBestRestaurants(point.Y, point.X, _settings.NearByRadius, request.From, request.To, Guid.Parse(request.Requester));

                return BaseServiceResponse<List<RestaurantDto>>.SuccessFullResponse(restarunts.ToList());
            }
            catch (Exception ex)
            {
                Log.Logger.Fatal("exception in fetching nearby places {ex}", ex);
                return BaseServiceResponse<List<RestaurantDto>>.FailedResponse("exception in fetching nearby places ");
            }
        }
    }
}
