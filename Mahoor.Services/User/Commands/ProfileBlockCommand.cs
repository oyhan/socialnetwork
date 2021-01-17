using System;
using Mahoor.Infrastructure;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.User.Commands
{
   public class ProfileBlockCommand : IRequest<BaseServiceResponse<bool>>,IAppBaseRequest
    {
        public ProfileBlockCommand(string requester, Guid postId)
        {
            Requester = requester;
            ProfileId = postId;
        }

        public string Requester { get; set; }
        public Guid ProfileId { get; }
    }
}
