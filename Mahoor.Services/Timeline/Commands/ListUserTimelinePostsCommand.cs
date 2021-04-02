using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;

namespace Mahoor.Services.Timeline.Commands
{
   public class ListUserTimelinePostsCommand :IAppBaseRequest,IRequest<BaseServiceResponse<IReadOnlyList<TimelinePostDto>>>
    {
        public string UserName { get; }
        public int From { get; }
        public int To { get; }
        public ListUserTimelinePostsCommand(string userName,string requester, int from , int to)
        {
            UserName = userName;
            From = from;
            To = to;
            Requester = requester;

        }

        public string Requester { get; set; }
    }
}
