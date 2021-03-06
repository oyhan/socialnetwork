using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Like.Command;
using Mahoor.Services.Response;
using MediatR;
using Serilog;

namespace Mahoor.Services.Like.Handlers
{
   public class NewUnLikePostHandler:IRequestHandler<NewUnLikePostCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;

        public NewUnLikePostHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<bool>> Handle(NewUnLikePostCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _graphService.DeleteAssociation(request.UserId, request.PostId, AType.Likes);
                return BaseServiceResponse<bool>.SuccessFullResponse(true);
            }
            catch (Exception e)
            {
                Log.Logger.Fatal("exception in submitting like {ex}", e);
                return BaseServiceResponse<bool>.FailedResponse("error in submitting like try again later");
            }

        }
    }
}
