using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;

namespace Mahoor.Services.Timeline.Commands
{
   public class ListUserTimelinePostsCommand :IRequest<BaseServiceResponse<IReadOnlyList<TimelinePostDto>>>
    {
        public string UserId { get; }
        public int From { get; }
        public int To { get; }
        public ListUserTimelinePostsCommand(string userId, int from , int to)
        {
            UserId = userId;
            From = from;
            To = to;
        }
    }
}
