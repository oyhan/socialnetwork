using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Profile.Dto;
using MediatR;
using Serilog;

namespace Mahoor.Services.User.Handlers
{
    class GetUserProfileByUsernameCommandHandler : IRequestHandler<GetUserProfileByUsernameCommand, BaseServiceResponse<ProfileDto>>
    {
        private readonly AppUserManager _userManager;
        private readonly IGraphService _graphService;

        public GetUserProfileByUsernameCommandHandler(AppUserManager userManager, IGraphService graphService)
        {
            _userManager = userManager;
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<ProfileDto>> Handle(GetUserProfileByUsernameCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userModel = (await _userManager.FindByUsername(request.UserName));
                var profileDto = userModel.ToProfileDtoModel();
                var noOfFollowers = await _graphService.GetAssociationCountTo(Guid.Parse(userModel.Id), AType.Following);
                var noOfFollwings = await _graphService.GetAssociationCountFrom(Guid.Parse(userModel.Id), AType.Following);
                var noOfPosts = await _graphService.GetAssociationCountTo(Guid.Parse(userModel.Id), AType.Authored);
                profileDto.NoOfFollowers = noOfFollowers;
                profileDto.NoOfFollowings = noOfFollwings;
                profileDto.NoOfPosts = noOfPosts;

                return BaseServiceResponse<ProfileDto>.SuccessFullResponse(profileDto);
            }
            catch (Exception e)
            {
                Log.Logger.Error("error in geting user profile {error}", e.ToString());

                return BaseServiceResponse<ProfileDto>.FailedResponse("error in fetching user profile");
            }


        }
    }
}
