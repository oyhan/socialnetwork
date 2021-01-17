using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Dtos;
using Mahoor.Services.Timeline.Dtos;

namespace Mahoor.Services.Review.Dto
{
    public class ReviewDto 
    {
        public IReadOnlyList<MediaDto> Medias { get; set; }
        public string PlaceName { get; set; }
        public int Rate { get; set; }
        public string Title { get; set; }
        //        [MinLength(100)]
        public string Description { get; set; }
        public Guid PlaceId { get; set; }
        public DateTime DateVisited { get; set; }
    }
}
