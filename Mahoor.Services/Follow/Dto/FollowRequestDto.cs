using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Follow.Dto
{
    public class FollowRequestDto
    {
        public string AvatarUrl { get; set; }
        public string Username { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
    }
}
