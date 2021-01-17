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
    public class PostReportCommandHandler:IRequestHandler<PostReportCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;

        public PostReportCommandHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async  Task<BaseServiceResponse<bool>> Handle(PostReportCommand request, CancellationToken cancellationToken)
        {
            await _graphService.AddAssociation(Guid.Parse(request.Requester), request.PostId, AType.Reported);
            return  BaseServiceResponse<bool>.SuccessFullResponse(true);
        }
    }
}
