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
        public Guid FollowerUser { get; }
        public string FollowedUserName { get; }

        public UnFollowUserCommand(Guid followerUser,string followedUserName)
        {
            FollowerUser = followerUser;
            FollowedUserName = followedUserName;
        }
    }
}
