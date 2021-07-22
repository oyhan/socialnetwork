using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Events;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Post;
using Mahoor.Services.Post.Events;
using MediatR;

namespace Mahoor.Services.Graph.Handlers
{
    class PostCreatedAddToObjectListEventHandler:INotificationHandler<PostCreatedEvent>
    {
        private readonly IGraphService _graphService;

        public PostCreatedAddToObjectListEventHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async Task Handle(PostCreatedEvent notification, CancellationToken cancellationToken)
        {
            //add post to the list of objects 
            var obj = new ObjectModel(notification.Post.Id,OType.Post,new
            {
                notification.Post.UserId,
                notification.Post.Medias,
                notification.Post.PlaceId,
//                PlaceName= notification.Post.Place.DisplayName,
                notification.Post.Text,
                notification.Post.User.UserName,
                notification.Post.CreatedDate,
                notification.Post.User.DisplayName
            }.ToJsonDocument());
            await _graphService.AddObject(obj);




//            var followrs = _graphService.GetAssociationsTo(Guid.Parse(notification.Post.UserId),AType.Following);


        }
    }
}
