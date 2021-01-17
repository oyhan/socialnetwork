using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using MediatR;

namespace Mahoor.Services.User.Handlers
{
    class UnFollowUserCommandHandler : IRequestHandler<FollowUserCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;

        public UnFollowUserCommandHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<bool>> Handle(FollowUserCommand request, CancellationToken cancellationToken)
        {
            await _graphService.DeleteAssociation(request.FollowerUser, request.FollowedUser, AType.Following);

            return BaseServiceResponse<bool>.SuccessFullResponse(true); 
        }
    }
}
