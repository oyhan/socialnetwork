using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Follow.Command
{
    public class AcceptFollowRequestCommand : IRequest<BaseServiceResponse<bool>> ,INotification
    {
        public Guid UserId { get; }
        public Guid FollowrUserId { get; }

        public AcceptFollowRequestCommand(Guid userid,Guid followrUserId)
        {
            UserId = userid;
            FollowrUserId = followrUserId;
        }
    }
}
