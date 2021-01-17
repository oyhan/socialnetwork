using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.DomainObjects.User;
using Mahoor.Services.Events;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.User;
using MediatR;

namespace Mahoor.Services.Graph.Handlers
{
    class UserCreatedEventHandler:INotificationHandler<UserCreatedEvent>
    {
        private readonly IGraphService _graphService;
        private readonly AppUserManager _userManager;

        public UserCreatedEventHandler(IGraphService graphService,AppUserManager userManager)
        {
            _graphService = graphService;
            _userManager = userManager;
        }
        public async Task Handle(UserCreatedEvent notification, CancellationToken cancellationToken)
        {
            var user = await _userManager.UserManager.FindByIdAsync(notification.UserId);
            var objectModel = new ObjectModel(Guid.Parse(notification.UserId), OType.Post, user.ToJsonDocument());
           await _graphService.AddObject(objectModel);
        }
    }
}
