using System;
using System.Collections.Generic;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;

namespace Mahoor.Services.Timeline.Dtos
{
    public class RestaurantDto
    {
        public string Name { get; set; }
        public float Rate { get; set; }
        public string Avatar { get; set; }
        /// <summary>
        /// In km
        /// </summary>
        public double DistanceInMeter { private get; set; }
        [JsonIgnore]
        public Geometry Location { get; set; }
        public string LatLon { get; set; }
        public string DistanceString => DistanceInMeter > 1000 ? $"{(DistanceInMeter / 1000):F2} کیلومتر" : $"{DistanceInMeter:F0} متر";
        public Guid Id { get; set; }
        public int NoOfReviews { get; set; }
        public bool Favorite { get; set; }
        public bool IsOpenNow { get; set; }
        public string Cuisine { get; internal set; }
    }
}
