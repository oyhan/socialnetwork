using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.User.Profile.Dto
{
    public class ProfileDto
    {
        public string DisplayName { get; set; }
        public int NoOfFollowers { get; set; }
        public int NoOfFollowings { get; set; }
        public int NoOfPosts { get; set; }
        public string UserName { get; set; }
        public string AvatarURl { get; set; }
        public string City { get; set; }
        public string Favorites { get; set; }
        public string Website { get; set; }
        public string Biography { get; set; }

    }
}
