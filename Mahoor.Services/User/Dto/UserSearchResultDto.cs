using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.User.Dto
{
    public class UserSearchResultDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public int NumberOfFollowers { get; set; }
        public string UserName { get; set; }
        public bool IsFollowing { get; set; }
        public string AvatarUrl { get; set; }
    }
}
