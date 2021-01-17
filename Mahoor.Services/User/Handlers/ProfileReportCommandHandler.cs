using System;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using Mahoor.Services.User.Commands;
using MediatR;

namespace Mahoor.Services.User.Handlers
{
    public class ProfileReportCommandHandler:IRequestHandler<ProfileReportCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;

        public ProfileReportCommandHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async  Task<BaseServiceResponse<bool>> Handle(ProfileReportCommand request, CancellationToken cancellationToken)
        {
            await _graphService.AddAssociation(Guid.Parse(request.Requester), request.ProfileId, AType.Reported);
            return  BaseServiceResponse<bool>.SuccessFullResponse(true);
        }
    }
}
