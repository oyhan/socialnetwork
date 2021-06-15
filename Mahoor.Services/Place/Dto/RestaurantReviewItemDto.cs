using System;
using System.Collections.Generic;
using System.Text;
using Humanizer;

namespace Mahoor.Services.Place.Dto
{
   public class RestaurantReviewItemDto
    {
        public int Rate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateVisited { get; set; }
        public string DateVisitedString => DateVisited.Humanize();
        public DateTime DateWritten { get; set; }
        public string DateWrittenString=> DateWritten.Humanize();
        public string UserAvatar { get; set; }
        public string Writer { get; set; }
        public string WriterUserName { get; set; }
        public string WriterCity { get; set; }
        public int NoOfReviews { get; set; }
        public string UserId { get; set; }
    }
}
