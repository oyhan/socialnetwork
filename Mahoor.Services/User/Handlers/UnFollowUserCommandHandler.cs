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
    class UnFollowUserCommandHandler : IRequestHandler<UnFollowUserCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;
        private readonly AppUserManager _userManager;

        public UnFollowUserCommandHandler(IGraphService graphService,AppUserManager userManager)
        {
            _graphService = graphService;
            _userManager = userManager;
        }
        public async Task<BaseServiceResponse<bool>> Handle(UnFollowUserCommand request, CancellationToken cancellationToken)
        {
            var followingUser =await _userManager.FindByUsername(request.FollowedUserName.ToString());
            await _graphService.DeleteAssociation(request.FollowerUser, Guid.Parse(followingUser.Id), AType.Following);

            return BaseServiceResponse<bool>.SuccessFullResponse(true); 
        }
    }
}
