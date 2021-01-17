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

        public FollowUserCommandHandler(IGraphService graphService, IMediator mediator)
        {
            _graphService = graphService;
            _mediator = mediator;
        }
        public async Task<BaseServiceResponse<bool>> Handle(FollowUserCommand request, CancellationToken cancellationToken)
        {

            var alreadyFollowed =
                await _graphService.HasAssociation(request.FollowerUser, request.FollowedUser, AType.Following | AType.FollowRequest);
            if (alreadyFollowed)
            {
                return BaseServiceResponse<bool>.FailedResponse("you are already following the person");


            }

            if (request.FollowedUser == request.FollowerUser)
            {
                return BaseServiceResponse<bool>.FailedResponse("you can not follow yourself");
            }


            await _graphService.AddAssociation(request.FollowerUser, request.FollowedUser, AType.Following, null);

            await _mediator.Publish(new NewFollowerEvent(request.FollowerUser, request.FollowedUser), cancellationToken);
            
            
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }
    }
}
