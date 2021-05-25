using Mahoor.Services.Post.Commands;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Mahoor.Services.Post.Handlers
{
    class GetPostByIdCommandHandler : IRequestHandler<GetPostByIdCommand, BaseServiceResponse<TimelinePostDto>>
    {
        private readonly IPostService _postService;

        public GetPostByIdCommandHandler(IPostService postService)
        {
            _postService = postService;
        }
        public Task<BaseServiceResponse<TimelinePostDto>> Handle(GetPostByIdCommand request, CancellationToken cancellationToken)
        {
            return _postService.GetPostById(request.PostId);
        }
    }
}
