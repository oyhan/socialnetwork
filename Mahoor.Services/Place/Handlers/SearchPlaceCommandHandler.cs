using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Place;
using Mahoor.DomainObjects.Place;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;
using Serilog;

namespace Mahoor.Services.Place.Handlers
{
    class SearchPlaceCommandHandler :IRequestHandler<SearchPlaceCommand,BaseServiceResponse<List<PlaceSearchDto>>>
    {
        private readonly IAppRepository<BasePlaceModel, Guid> _placeRepository;

        public SearchPlaceCommandHandler(IAppRepository<BasePlaceModel,Guid> placeRepository)
        {
            _placeRepository = placeRepository;
        }
        public async Task<BaseServiceResponse<List<PlaceSearchDto>>> Handle(SearchPlaceCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var response = await _placeRepository.ListAsync(p => new PlaceSearchDto()
                {
                    Id = p.Id,
                    Name = p.Name,
                }, new SearchPlaceQuery(request.Name));

                return BaseServiceResponse<List<PlaceSearchDto>>.SuccessFullResponse(response.ToList());
            }
            catch (Exception e)
            {
                Log.Logger.Fatal("exception in search place {ex}", e);
                return BaseServiceResponse<List<PlaceSearchDto>>.FailedResponse("error in searching places");
            }
        }
    }
}
