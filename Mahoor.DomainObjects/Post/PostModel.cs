using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.User;
using Microsoft.EntityFrameworkCore;

namespace Mahoor.DomainObjects.Post
{
    public class PostModel : BaseModel<Guid>
    {
        public string Text { get; set; }
        public string UserId { get; set; }
        public Guid? PlaceId { get; set; }
        public string PlaceName { get; set; }
        public BasePlaceModel Place { get; set; }
        public UserModel User { get; set; }
        public List<Media> Medias { get; set; }
        public CityModel City { get; set; }
        public Guid? CityId { get; set; }
    }

    [Owned]
    public class Media
    {
        public  MediaType MediaType  { get; set; }
        public string MimeType { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public string Name { get; set; }
    }

    public enum MediaType
    {
        Picture,
        Video,
    }
}
