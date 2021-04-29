using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.User.Follower.Dto
{
    public class FollowerItemDto 
    {
        public string AvatarUrl { get; set; }
        public string UserName { get; set; }
        public string Location { get; set; }
        public string FullName { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
    }
}
