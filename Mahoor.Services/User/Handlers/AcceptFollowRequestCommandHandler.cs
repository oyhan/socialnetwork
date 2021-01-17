using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Follow.Command;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.User.Handlers
{
    class AcceptFollowRequestCommandHandler:
        IRequestHandler<AcceptFollowRequestCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;
        private readonly IMediator _mediator;

        public AcceptFollowRequestCommandHandler(IGraphService graphService , IMediator mediator)
        {
            _graphService = graphService;
            _mediator = mediator;
        }
        public async Task<BaseServiceResponse<bool>> Handle(AcceptFollowRequestCommand request, CancellationToken cancellationToken)
        {
            await _graphService.AddAssociation(request.FollowrUserId, request.UserId, AType.Following,null);
            await _mediator.Publish(request, cancellationToken);
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }
    }
}
