using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class UnFollowUserCommand : IRequest<BaseServiceResponse<bool>>
    {
        public string FollowerUser { get; }
        public string FollowedUser { get; }

        public UnFollowUserCommand(string followerUser,string followedUser)
        {
            FollowerUser = followerUser;
            FollowedUser = followedUser;
        }
    }
}
