using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.AccessControl;
using System.Text;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.User;
using NpgsqlTypes;

namespace Mahoor.DomainObjects.Review
{
    public class ReviewModel : BaseModel<Guid>
    {
        public int Rate { get; set; }
        public string Title { get; set; }
//        [MinLength(100)]
        public string  Description { get; set; }
        public Guid PlaceId { get; set; }
        public DateTime DateVisited { get; set; }
        public string PlaceName { get; set; }
        public BasePlaceModel Place { get; set; }
        public ICollection<Media> Medias { get; set; }
        public UserModel User { get; set; }
        public string UserId { get; set; }

    }
}
