using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Place;
using Mahoor.Services.Post;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Commands;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User;
using MediatR;
using Serilog;
using Serilog.Core;

namespace Mahoor.Services.Timeline.Handlers
{
    class GetUserTimelineCommandHandler:IRequestHandler<GetUserTimelineCommand,BaseServiceResponse<TimelineDto>>
    {
        private readonly IPlaceService _placeService;
        private readonly ITimelineService _timelineService;
        private readonly IGraphService _graphService;
        private readonly AppUserManager _userManager;


        public GetUserTimelineCommandHandler(IPlaceService placeService, ITimelineService timelineService,
            IGraphService graphService , AppUserManager userManager)
        {
            _placeService = placeService;
            _timelineService = timelineService;
            _graphService = graphService;
            _userManager = userManager;
        }

        public  async Task<BaseServiceResponse<TimelineDto>> Handle(GetUserTimelineCommand request,
            CancellationToken cancellationToken)
        {
            try
            {
                var dto = new TimelineDto();
                dto.ClosestRestaurants =await  _placeService.GetClosestRestaurants(request.Lat, request.Lon, radius: 5, 0, 5,request.UserId);
                //todo change the recommendation 
                dto.RecommandedRestaurants = await _placeService.GetBestRestaurants(request.Lat, request.Lon, radius: 5, 0, 5, request.UserId);
                dto.FollowingsPosts = await _timelineService.ListFollowingsPosts(request.UserId, 0, 100);
                dto.FollowRequests = await _userManager.GetUserFollowRequests(
                    (await _graphService.GetAssociationsTo(request.UserId, AType.FollowRequest))
                    .Select(s => s.ToString()).ToList());
                return BaseServiceResponse<TimelineDto>.SuccessFullResponse(dto);
            }
            catch (Exception e)
            {
                
                Log.Logger.Error("error in fetching timeline for userid : {userid} with error : {error}",
                    request.UserId, e.ToString());
                return BaseServiceResponse<TimelineDto>.FailedResponse("error fetching timeline data");
            }
        }
    }
}
