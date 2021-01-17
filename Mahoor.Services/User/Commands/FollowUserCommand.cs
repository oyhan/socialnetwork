using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class FollowUserCommand : IRequest<BaseServiceResponse<bool>>
    {
        public Guid FollowerUser { get; }
        public Guid FollowedUser { get; }

        public FollowUserCommand(Guid followerUser, Guid followedUser)
        {
            FollowerUser = followerUser;
            FollowedUser = followedUser;
        }
    }
}
