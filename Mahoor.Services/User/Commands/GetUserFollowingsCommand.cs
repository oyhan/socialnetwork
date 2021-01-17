using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using Mahoor.Services.User.Follower.Dto;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class GetUserFollowingsCommand : IRequest<BaseServiceResponse<List<FollowerItemDto>>>
    {
        public string Username { get; }

        public GetUserFollowingsCommand(string username)
        {
            Username = username;
        }
    }
}
