using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Post.Handlers
{
    class EditPostHandler:IRequestHandler<EditPostCommand,BaseServiceResponse<bool>>
    {
        private readonly IPostService _postService;

        public EditPostHandler(IPostService postService)
        {
            _postService = postService;
        }
        public async Task<BaseServiceResponse<bool>> Handle(EditPostCommand request, CancellationToken cancellationToken)
        {
            return await _postService.EditPost(request);
        }
    }
}
