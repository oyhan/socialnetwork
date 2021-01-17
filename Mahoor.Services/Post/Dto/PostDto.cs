using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.User;

namespace Mahoor.Services.Post.Dto
{
    public class PostDto
    {
        public string Text { get; set; }
        public BasePlaceModel Place { get; set; }
        public UserModel User { get; set; }
        public List<Media> Medias { get; set; }
    }
}
