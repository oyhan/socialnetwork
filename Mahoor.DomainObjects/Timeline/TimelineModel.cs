using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.DomainObjects.Timeline
{
    public class TimelineModel : BaseModel<Guid>
    {
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
        public PostModel Post { get; set; }
        public Guid PostId { get; set; }
    }
}
