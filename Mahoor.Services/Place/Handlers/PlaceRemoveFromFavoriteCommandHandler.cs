using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;
using Serilog;

namespace Mahoor.Services.Place.Handlers
{
    public class PlaceRemoveFromFavoriteCommandHandler : IRequestHandler<PlaceRemoveFromFavoriteCommand, BaseServiceResponse<bool>>
    {
        private readonly IGraphService _graphService;

        public PlaceRemoveFromFavoriteCommandHandler(IGraphService graphService)
        {
            _graphService = graphService;
        }
        public async Task<BaseServiceResponse<bool>> Handle(PlaceRemoveFromFavoriteCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _graphService.DeleteAssociation(Guid.Parse(request.Requester), request.PlaceId, AType.Faved);
                return BaseServiceResponse<bool>.SuccessFullResponse(true);
            }
            catch (Exception ex)
            {
                Log.Logger.Fatal("exception in add place to favorite {ex}", ex);
                return BaseServiceResponse<bool>.FailedResponse("error in faving a places");
            }

        }
    }
}
