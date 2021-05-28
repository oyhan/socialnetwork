using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.City;
using Mahoor.Data.Queries.Place;
using Mahoor.DomainObjects.City;
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
        private readonly IAppRepository<CityModel, Guid> _cityRepository;

        public SearchPlaceCommandHandler(IAppRepository<BasePlaceModel,Guid> placeRepository, IAppRepository<CityModel, Guid> cityRepository)
        {
            _placeRepository = placeRepository;
            _cityRepository = cityRepository;
        }
        public async Task<BaseServiceResponse<List<PlaceSearchDto>>> Handle(SearchPlaceCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var cityToSearchIn =request.CityId !=null ? await _cityRepository.GetByIdAsync(request.CityId.Value) : null;
                var response = await _placeRepository.ListAsync(p => new PlaceSearchDto()
                {
                    Id = p.Id,
                    Name = p.Name,
                }, new SearchPlaceQuery(request.Name, cityToSearchIn));

                //var responseCities = await _cityRepository.ListAsync(p => new PlaceSearchDto()
                //{
                //    Id = p.Id,
                //    Name = p.City,
                //    IsCity = true
                //}, new GetAllCitiesQuery(request.Name));

                var result = response.ToList();
                //result.AddRange(responseCities);
                return BaseServiceResponse<List<PlaceSearchDto>>.SuccessFullResponse(result);
            }
            catch (Exception e)
            {
                Log.Logger.Fatal("exception in search place {ex}", e);
                return BaseServiceResponse<List<PlaceSearchDto>>.FailedResponse("error in searching places");
            }
        }
    }
}
