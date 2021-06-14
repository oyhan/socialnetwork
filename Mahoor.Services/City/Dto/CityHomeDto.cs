using Mahoor.DomainObjects.Post;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.City.Dto
{
    public class CityHomeDto:CityDto
    {
        public string LastPhoto { get; set; }
        public int PhotosCount { get; set; }
        public IEnumerable<PostModel> Posts{ get; set; }
        public string DistanceToUser { get; set; }
    }
}
