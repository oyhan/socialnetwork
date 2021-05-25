using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Place;
using NetTopologySuite.Geometries;
using NetTopologySuite.Operation.Buffer;

namespace Mahoor.Data.Queries.Timeline
{
   public sealed class GetClosestRestaurants :BaseSpecification<RestaurantModel,Guid>
    {
        /// <summary>
        /// Query for locations with closest to a point and then order them by their rate then by
        /// distance
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <param name="distance"></param>
        public GetClosestRestaurants(double lat , double lon, double distance , int from , int to)
        {
            var userLocation = new Point(lon, lat);
            var buffer = userLocation.Buffer(500);
            AddCriteria(r=>r.Location.Distance(userLocation) <= distance);
            ApplyOrderByDescending(x=>x.Rate);
            ApplyOrderBy(x => x.Location.Distance(userLocation));
            ApplyPaging(from, to);
        }
        public GetClosestRestaurants(Geometry location, double distance, int from, int to)
        {
            var userLocation = location;
            var buffer = userLocation.Buffer(500);
            AddCriteria(r => r.Location.Distance(userLocation) <= distance);
            ApplyOrderByDescending(x => x.Rate);
            ApplyOrderBy(x => x.Location.Distance(userLocation));
            ApplyPaging(from, to);
        }
    }
}
