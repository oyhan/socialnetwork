using System;
using System.Collections.Generic;
using Mahoor.DomainObjects.Post;

namespace Mahoor.Services.Timeline.Dtos
{
    public class TimelinePostDto
    {
        public int Likes { get; set; }
        public List<TimelineMediaDto> Medias { get; set; }
        public string Text { get; set; }
        public string PlaceName { get; set; }
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool  Liked { get; set; }
    }
}
