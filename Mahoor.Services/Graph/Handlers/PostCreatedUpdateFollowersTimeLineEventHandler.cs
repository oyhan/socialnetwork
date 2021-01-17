using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Post.Events;
using Mahoor.Services.Redis;
using Mahoor.Services.Timeline;
using MediatR;
using StackExchange.Redis;

namespace Mahoor.Services.Graph.Handlers
{
    class PostCreatedUpdateFollowersTimeLineEventHandler : INotificationHandler<PostCreatedEvent>
    {
        private readonly IGraphService _graphService;
        private readonly IAppRepository<ObjectModel, Guid> _objectRepository;
        private readonly ITimelineService _timelineService;

        public PostCreatedUpdateFollowersTimeLineEventHandler(IGraphService graphService,
            IAppRepository<ObjectModel, Guid> objectRepository
            , ITimelineService timelineService)
        {
            _graphService = graphService;
            _objectRepository = objectRepository;
            _timelineService = timelineService;

        }

        public async Task Handle(PostCreatedEvent notification, CancellationToken cancellationToken)
        {
            //find the followers which their timeline need to be updated
            var followersIds =
                await _graphService.GetAssociationsTo(Guid.Parse(notification.Post.UserId), AType.Following);

            foreach (var followersId in followersIds)
            {
                await _timelineService.AddPostToTimeline(followersId.ToString(), notification.Post);
                //                var followr = await _objectRepository.GetByIdAsync(followersId);

            }



        }
    }
}
