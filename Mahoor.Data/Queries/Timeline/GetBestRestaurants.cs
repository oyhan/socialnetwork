﻿using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Place;
using NetTopologySuite.Geometries;
using NetTopologySuite.Operation.Buffer;

namespace Mahoor.Data.Queries.Timeline
{
   public sealed class GetBestRestaurants : BaseSpecification<RestaurantModel,Guid>
    {
        /// <summary>
        /// Query for locations with closest to a point and then order them by their rate then by
        /// distance
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <param name="distance"></param>
        public GetBestRestaurants( int from , int to)
        {
            ApplyOrderByDescending(x=>x.Rate);
            ApplyPaging(from, to);
        }
       
    }
}
