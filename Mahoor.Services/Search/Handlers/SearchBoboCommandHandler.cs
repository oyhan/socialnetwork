using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Response;
using Mahoor.Services.Search.Commands;
using Mahoor.Services.Search.Dto;
using Mahoor.Services.User;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Mahoor.Services.Search.Handlers
{
    public class SearchBoboCommandHandler : IRequestHandler<SearchBoboCommand, BaseServiceResponse<SearchBoboDto>>
    {
        private readonly AppUserManager _userManager;
        private readonly IGraphService _graphService;
        private readonly IMediator _mediator;

        public SearchBoboCommandHandler(IMediator mediator , AppUserManager userManager,IGraphService graphService)
        {
            _mediator = mediator;
            _userManager = userManager;
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<SearchBoboDto>> Handle(SearchBoboCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var result = new SearchBoboDto();
                var term = request.Term.ToLower();
                var users = await _userManager.UserManager.Users.Where(u => u.UserName.ToLower().Contains(request.Term)).Select(u => u.ToSearchDto()).ToListAsync();
                var followings = await _graphService.GetAssociationsFrom(Guid.Parse(request.Requester), DomainObjects.SocialGraph.AType.Following);
                var followingsHashSet = followings.Select(f => f.ToString()).ToHashSet();
                foreach (var user in users)
                {
                    var isFollowing = followingsHashSet.Contains(user.Id);
                    user.IsFollowing = isFollowing;
                }
                result.Users = users;

                return BaseServiceResponse<SearchBoboDto>.SuccessFullResponse(result);
            }
            catch (Exception ex)
            {
                Log.Logger.Error("error in searching in users {error}", ex.ToString());

                return BaseServiceResponse<SearchBoboDto>.FailedResponse("error in searching in users");
            }

        }
    }
}
