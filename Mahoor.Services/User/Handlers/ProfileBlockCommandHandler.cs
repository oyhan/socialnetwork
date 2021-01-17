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
    public class ProfileBlockCommandHandler:IRequestHandler<ProfileBlockCommand,BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;

        public ProfileBlockCommandHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async  Task<BaseServiceResponse<bool>> Handle(ProfileBlockCommand request, CancellationToken cancellationToken)
        {
            await _graphService.AddAssociation(Guid.Parse(request.Requester), request.ProfileId, AType.Blocked);
            return  BaseServiceResponse<bool>.SuccessFullResponse(true);
        }
    }
}
