using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;

namespace Mahoor.Services.Place.Dto
{
    public class RestaurantDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int? NoOfReviews { get; set; }
        public string Cuisine { get; set; }
        public string DistanceToUser { get; set; }
        public string Website { get; set; }
        public string Telephone { get; set; }
        public float Rate { get; set; }
        public bool IsOpenNow { get; set; }
        public string Services { get; set; }
        public string Address { get; set; }
        public string Location { get; set; }
        public string DistanceString => DistanceInMeter > 1000 ? $"{(DistanceInMeter / 1000):F2} کیلومتر" : $"{DistanceInMeter:F0} متر";
        public double DistanceInMeter { private get; set; }
        public List<RestaurantReviewItemDto> Reviews { get; set; } = new List<RestaurantReviewItemDto>();
        public bool Favorite { get; set; }
    }
}
