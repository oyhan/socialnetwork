using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Post.Commands
{
   public class PostReportCommand : IRequest<BaseServiceResponse<bool>>,IAppBaseRequest
    {
        public PostReportCommand(string requester, Guid postId)
        {
            Requester = requester;
            PostId = postId;
        }

        public string Requester { get; set; }
        public Guid PostId { get; }
    }
}
