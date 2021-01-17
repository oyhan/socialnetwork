using System.Collections.Generic;
using Mahoor.Services.Follow.Dto;

namespace Mahoor.Services.Timeline.Dtos
{
    public class TimelineDto
    {
        public IReadOnlyList<RestaurantDto> ClosestRestaurants { get; set; }
        public IReadOnlyList<RestaurantDto> RecommandedRestaurants { get; set; }
        public IReadOnlyList<TimelinePostDto> FollowingsPosts { get; set; }
        public IReadOnlyList<FollowRequestDto> FollowRequests { get; set; }

    }
}
