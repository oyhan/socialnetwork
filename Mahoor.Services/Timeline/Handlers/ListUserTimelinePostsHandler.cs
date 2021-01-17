using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Commands;
using Mahoor.Services.Timeline.Dtos;
using MediatR;
using Microsoft.Extensions.Logging;
using Serilog;

namespace Mahoor.Services.Timeline.Handlers
{
    class ListUserTimelinePostsHandler:IRequestHandler<ListUserTimelinePostsCommand,BaseServiceResponse<IReadOnlyList<TimelinePostDto>>>
    {
        private readonly ITimelineService _timelineService;

        public ListUserTimelinePostsHandler(ITimelineService timelineService)
        {
            _timelineService = timelineService;
        }
        public async Task<BaseServiceResponse<IReadOnlyList<TimelinePostDto>>> Handle(ListUserTimelinePostsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                return BaseServiceResponse<IReadOnlyList<TimelinePostDto>>.SuccessFullResponse(await _timelineService.ListFollowingsPosts(Guid.Parse(request.UserId), request.From, request.To));
            }
            catch (Exception exeption)

            {
                Log.Logger.Fatal("exception in fetching timeline {user} with {error}",request.UserId ,exeption);
               return BaseServiceResponse<IReadOnlyList<TimelinePostDto>>.FailedResponse("error in fetching timeline");
            }
        }
    }
}
