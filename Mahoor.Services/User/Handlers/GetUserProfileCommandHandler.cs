using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Profile.Dto;
using MediatR;
using Serilog;

namespace Mahoor.Services.User.Handlers
{
    class GetUserProfileCommandHandler : IRequestHandler<GetUserProfileCommand, BaseServiceResponse<ProfileDto>>
    {
        private readonly AppUserManager _userManager;
        private readonly IGraphService _graphService;

        public GetUserProfileCommandHandler(AppUserManager userManager, IGraphService graphService)
        {
            _userManager = userManager;
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<ProfileDto>> Handle(GetUserProfileCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var dto = await _userManager.GetUserProfile(request.UserId.ToString());
                var noOfFollowers = await _graphService.GetAssociationCountTo(request.UserId, AType.Following);
                var noOfFollwings = await _graphService.GetAssociationCountFrom(request.UserId, AType.Following);
                var noOfPosts = await _graphService.GetAssociationCountTo(request.UserId, AType.Authored);
                dto.NoOfFollowers = noOfFollowers;
                dto.NoOfFollowings = noOfFollwings;
                dto.NoOfPosts = noOfPosts;
                if (request.Requester == request.UserId.ToString())
                {
                    dto.IsOwner = true;
                }

                dto.IsFollowing =
                    await _graphService.HasAssociation(request.Requester, request.UserId.ToString(), AType.Following);

                return BaseServiceResponse<ProfileDto>.SuccessFullResponse(dto);
            }
            catch (Exception e)
            {
                Log.Logger.Error("error in geting user profile {error}", e.ToString());

                return BaseServiceResponse<ProfileDto>.FailedResponse("error in fetching user profile");
            }


        }
    }
}
