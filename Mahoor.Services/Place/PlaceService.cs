using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ChefCode.Common.Interfaces;
using Mahoor.Data;
using Mahoor.Data.Queries.Review;
using Mahoor.Data.Queries.Timeline;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Infrastructure;
using Mahoor.Services.Graph;
using Mahoor.Services.Timeline.Dtos;
using Microsoft.Extensions.Options;
using NetTopologySuite.Geometries;

namespace Mahoor.Services.Place
{
    public class PlaceService : IPlaceService
    {
        private readonly IAppRepository<RestaurantModel, Guid> _placeRepository;
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;
        private readonly IGraphService _graphService;
        private readonly AppSettings _settings;

        public PlaceService(IAppRepository<RestaurantModel, Guid> placeRepository, IOptionsSnapshot<AppSettings> settings,
            IAppRepository<ReviewModel, Guid> reviewRepository, IGraphService graphService)
        {
            _placeRepository = placeRepository;
            _reviewRepository = reviewRepository;
            _graphService = graphService;
            _settings = settings.Value;
        }
        /// <summary>
        /// Gets closest
        /// </summary>
        /// <param name="lat">y</param>
        /// <param name="lon">x</param>
        /// <param name="radius">in km</param>
        /// <returns></returns>
        public async Task<IReadOnlyList<RestaurantDto>> GetClosestRestaurants(double lat, double lon, double radius, int from, int to, Guid userId)
        {
            var userLocation = new Point(lon, lat);
            var favoritePlaces = await _graphService.GetAssociationsFrom(userId, AType.Faved);
            var closestRestaurants = await _placeRepository.ListAsync(r => new RestaurantDto()
            {
                Name = r.Name,
                DistanceInMeter = r.Location.Distance(userLocation),
                Avatar = r.Avatar,
                Rate = r.Rate,
                Location = r.Location,
                Id = r.Id,
                NoOfReviews = r.Reviews.Count,
                Favorite = favoritePlaces.Any(i => i == r.Id)

            },
                new GetClosestRestaurants(lat, lon, _settings.NearByRadius, from, to));
            foreach (var restaurant in closestRestaurants)
            {
                restaurant.LatLon = restaurant.Location.Coordinates.Select(c => $"[{c.Y},{c.X}]").FirstOrDefault();
            }
            return closestRestaurants;
        }



    }
}
