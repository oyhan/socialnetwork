using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.City;
using Mahoor.DomainObjects.City;
using Mahoor.Services.City.Commands;
using Mahoor.Services.City.Dto;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.City.Handlers
{
    public class GetCityByLatLongCommandHandler :IRequestHandler<GetCityByLatLongCommand 
        , BaseServiceResponse<List<CityDto>>>
    {
        private readonly IAppRepository<CityModel, Guid> _cityRepository;

        public GetCityByLatLongCommandHandler(IAppRepository<CityModel, Guid> cityRepository)
        {
            _cityRepository = cityRepository;
        }
        public async  Task<BaseServiceResponse<List<CityDto>>> Handle(GetCityByLatLongCommand request, CancellationToken cancellationToken)
        {
            var citys = (await _cityRepository.ListAsync(s => s.ToCityDto(),
                new GetCurrentCityQuery(request.Lat, request.Lon, request.From, request.To))).ToList();

            return BaseServiceResponse<List<CityDto>>.SuccessFullResponse(citys);
        }
    }
}
