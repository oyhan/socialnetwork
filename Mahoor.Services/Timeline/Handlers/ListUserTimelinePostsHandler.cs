using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Graph;
using Mahoor.Data.Queries.Timeline;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Commands;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Serilog;

namespace Mahoor.Services.Timeline.Handlers
{
    class ListUserTimelinePostsHandler:IRequestHandler<ListUserTimelinePostsCommand,BaseServiceResponse<IReadOnlyList<TimelinePostDto>>>
    {
        private readonly IGraphService _graphService;
        private readonly AppUserManager _userManager;
        private readonly IAppRepository<PostModel, Guid> _postRepository;
        private readonly IAppRepository<AssociationModel, Guid> _associationRepository;
        private readonly ITimelineService _timelineService;

        public ListUserTimelinePostsHandler(IGraphService graphService,AppUserManager userManager ,IAppRepository<PostModel,Guid> postRepository, ITimelineService timelineService)
        {
            _graphService = graphService;
            _userManager = userManager;
            _postRepository = postRepository;
            _timelineService = timelineService;
        }
        public async Task<BaseServiceResponse<IReadOnlyList<TimelinePostDto>>> Handle(ListUserTimelinePostsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userManager.FindByUsername(request.UserName);
                if (user==null)
                {
                    return  BaseServiceResponse<IReadOnlyList<TimelinePostDto>>.FailedResponse("Invalid username");
                }
                // var posts = await _associationRepository.ListAsync(s => s.Data.ToTimelinePostDto(),
                //     new UsersPostsQuery(userId, request.From,request.To));
                
                var followingIdList = new List<string>(new[] {user.Id});
                var posts =await _postRepository.ListAsync(s=>s.ToTimelinePostDto(),new GetUserTimelinePosts(followingIdList,request.From ,request.To));

                // var posts = await _timelineService.ListFollowingsPosts(userId, request.From, request.To);
                
                foreach (var post in posts)
                {
                    post.Likes = await _graphService.GetAssociationCountTo(post.Id, AType.Likes);
                    post.Liked = await _graphService.HasAssociation(Guid.Parse(request.Requester), post.Id, AType.Likes);
                    post.AvatarUrl = user.AvatarUrl;
                }
                return BaseServiceResponse<IReadOnlyList<TimelinePostDto>>.SuccessFullResponse(posts);
            }
            catch (Exception exeption)

            {
                Log.Logger.Fatal("exception in fetching timeline {user} with {error}",request.UserName ,exeption);
               return BaseServiceResponse<IReadOnlyList<TimelinePostDto>>.FailedResponse("error in fetching timeline");
            }
        }
    }
}
