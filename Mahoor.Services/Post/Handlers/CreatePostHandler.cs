using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Post.Handlers
{
    class CreatePostHandler : IRequestHandler<CreatePostCommand, BaseServiceResponse<Guid>>
    {
        private readonly IPostService _postService;
        private readonly IGraphService _graphService;
        private readonly IAppRepository<PostModel, Guid> _postRepository;

        public CreatePostHandler(IPostService postService,IGraphService graphService,IAppRepository<PostModel , Guid> postRepository)
        {
            _postService = postService;
            _graphService = graphService;
            _postRepository = postRepository;
        }

        public async Task<BaseServiceResponse<Guid>> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            //create user
            var serviceResponse = await _postService.CreatePost(request);

            // add to graph
            if (serviceResponse.SuccessFull)
            {
                var newPost = await _postRepository.GetByIdAsync(serviceResponse.Response);
                await _graphService.AddAssociation(Guid.Parse(request.UserId), serviceResponse.Response, AType.Authored
                    ,newPost.ToTimelinePostDto());
            }

            return serviceResponse;
        }
    }
}
