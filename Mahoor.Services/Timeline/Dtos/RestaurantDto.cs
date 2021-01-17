using System;
using NetTopologySuite.Geometries;

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

        public string Location { get; set; }

        public string DistanceString => DistanceInMeter > 1000 ? $"{(DistanceInMeter / 1000):F2} km" : $"{DistanceInMeter:F0} meter";
        public Guid Id { get; set; }
    }
}
