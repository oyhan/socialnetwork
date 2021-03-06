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
            var followerUser = await _userManager.FindByUsername(request.FollowerUser.ToString());
            
            var alreadyFollowed =
                await _graphService.HasAssociation(request.FollowerUser, Guid.Parse(followingUser.Id), AType.Following | AType.FollowRequest);
            await _graphService.DeleteAssociation(request.FollowerUser, Guid.Parse(followingUser.Id), AType.Following);

            if (alreadyFollowed)
            {
                followingUser.NumberOfFollowers--;
                followerUser.NumberOfFollowings--;
                await _userManager.UserManager.UpdateAsync(followingUser);
                await _userManager.UserManager.UpdateAsync(followerUser);
            }

            return BaseServiceResponse<bool>.SuccessFullResponse(true); 
        }
    }
}
