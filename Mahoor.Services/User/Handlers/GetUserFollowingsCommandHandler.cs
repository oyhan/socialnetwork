using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Follower.Dto;
using MediatR;
using Serilog;

namespace Mahoor.Services.User.Handlers
{
    public class GetUserFollowingsCommandHandler : IRequestHandler<GetUserFollowingsCommand, BaseServiceResponse<List<FollowerItemDto>>>
    {
        private readonly IGraphService _graphService;
        private readonly AppUserManager _userManager;

        public GetUserFollowingsCommandHandler(IGraphService graphService, AppUserManager userManager)
        {
            _graphService = graphService;
            _userManager = userManager;
        }
        public async Task<BaseServiceResponse<List<FollowerItemDto>>> Handle(GetUserFollowingsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userManager.UserManager.FindByNameAsync(request.UserName);
                var userId = Guid.Parse(user.Id);
                var followers =
                    (await _graphService.GetAssociationsFrom(userId, AType.Following)).Select(s => s.ToString());
                var followerItems = _userManager.UserManager.Users.Where(u => followers.Contains(u.Id))
                    .Select(s => new FollowerItemDto()
                    {
                        Location = $"{s.City.City},{s.City.Province}",
                        AvatarUrl = s.AvatarUrl,
                        UserName = s.UserName,
                        FullName = $"{s.DisplayName}",
                        IsFollowingBack = true,

                    }).ToList();

                return BaseServiceResponse<List<FollowerItemDto>>.SuccessFullResponse(followerItems);
            }
            catch (Exception ex)
            {

                Log.Logger.
                    Error("error in getting followers list {error}",
                        ex.ToString());
                return BaseServiceResponse<List<FollowerItemDto>>
                    .FailedResponse("error getting list ",ex.ToString());
            }

            
        }



    }
}
