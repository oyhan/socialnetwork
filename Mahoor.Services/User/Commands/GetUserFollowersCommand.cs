using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using Mahoor.Services.User.Follower.Dto;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class GetUserFollowersCommand : IRequest<BaseServiceResponse<List<FollowerItemDto>>>
    {
        public string Username { get; }

        public GetUserFollowersCommand(string username)
        {
            Username = username;
        }
    }
}
