using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Follow;
using Mahoor.Services.Graph;
using Mahoor.Services.Redis;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using MediatR;
using StackExchange.Redis;

namespace Mahoor.Services.User.Handlers
{
    class FollowUserCommandHandler : IRequestHandler<FollowUserCommand, BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;
        private readonly IMediator _mediator;
        private readonly AppUserManager _userManager;

        public FollowUserCommandHandler(IGraphService graphService, IMediator mediator, AppUserManager userManager)
        {
            _graphService = graphService;
            _mediator = mediator;
            _userManager = userManager;
        }
        public async Task<BaseServiceResponse<bool>> Handle(FollowUserCommand request, CancellationToken cancellationToken)
        {
            var followingUser = await _userManager.FindByUsername(request.FollowedUserName.ToString());
            var alreadyFollowed =
                await _graphService.HasAssociation(request.FollowerUser, Guid.Parse(followingUser.Id), AType.Following | AType.FollowRequest);

            if (alreadyFollowed)
            {
                return BaseServiceResponse<bool>.FailedResponse("you are already following the person");
            }

            if (Guid.Parse(followingUser.Id) == request.FollowerUser)
            {
                return BaseServiceResponse<bool>.FailedResponse("you can not follow yourself");
            }


            await _graphService.AddAssociation(request.FollowerUser, Guid.Parse(followingUser.Id), AType.Following, null);

            await _mediator.Publish(new NewFollowerEvent(request.FollowerUser, Guid.Parse(followingUser.Id)), cancellationToken);
            
            
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }
    }
}
