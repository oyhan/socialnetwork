using System;
using Mahoor.Infrastructure;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.User.Commands
{
   public class ProfileReportCommand : IRequest<BaseServiceResponse<bool>>,IAppBaseRequest
    {
        public ProfileReportCommand(string requester, Guid postId)
        {
            Requester = requester;
            ProfileId = postId;
        }

        public string Requester { get; set; }
        public Guid ProfileId { get; }
    }
}
