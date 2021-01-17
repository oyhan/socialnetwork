using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ChefCode.Common.Interfaces;
using Mahoor.Data;
using Mahoor.Data.Queries.Timeline;
using Mahoor.DomainObjects.Place;
using Mahoor.Infrastructure;
using Mahoor.Services.Timeline.Dtos;
using Microsoft.Extensions.Options;
using NetTopologySuite.Geometries;

namespace Mahoor.Services.Place
{
    public class PlaceService : IPlaceService
    {
        private readonly IAppRepository<RestaurantModel, Guid> _placeRepository;
        private readonly AppSettings _settings;

        public PlaceService(IAppRepository<RestaurantModel,Guid> placeRepository , IOptionsSnapshot<AppSettings> settings)
        {
            _placeRepository = placeRepository;
            _settings = settings.Value;
        }
        /// <summary>
        /// Gets closest
        /// </summary>
        /// <param name="lat">y</param>
        /// <param name="lon">x</param>
        /// <param name="radius">in km</param>
        /// <returns></returns>
        public async Task<IReadOnlyList<RestaurantDto>> GetClosestRestaurants(double lat, double lon, double radius , int from , int to)
        {
            var userLocation = new Point(lon, lat);
            var closestRestaurants = await _placeRepository.ListAsync(r=>new RestaurantDto(){
                  Name =  r.Name,
                  DistanceInMeter = r.Location.Distance(userLocation),
                  Avatar = r.Avatar,
                  Rate = r.Rate,
                  Location =  r.Location.ToText(),
                  Id =r.Id
                },
                new GetClosestRestaurants(lat, lon, _settings.NearByRadius , from, to));

            return closestRestaurants;
        }


       
    }
}
