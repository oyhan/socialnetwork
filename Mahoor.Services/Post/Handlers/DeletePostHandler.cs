using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Post.Handlers
{
    class DeletePostHandler : IRequestHandler<DeletePostCommand, BaseServiceResponse<bool>>
    {
        private readonly IPostService _postService;
        private readonly IGraphService _graphService;

        public DeletePostHandler(IPostService postService,IGraphService graphService)
        {
            _postService = postService;
            _graphService = graphService;
        }

        public async Task<BaseServiceResponse<bool>> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            if (await _graphService.HasAssociation(request.Requester,request.PostId,AType.Authored))
            {
                return await _postService.DeletePost(request);
            }
            return BaseServiceResponse<bool>.FailedResponse("you don't have the permission");
        }
    }
}
