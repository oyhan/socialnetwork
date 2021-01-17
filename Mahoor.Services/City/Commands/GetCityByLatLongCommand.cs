using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.City.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.City.Commands
{
    public class GetCityByLatLongCommand : IRequest<BaseServiceResponse<List<CityDto>>>, IQuery
    {
        public double Lat { get; }
        public double Lon { get; }

        public GetCityByLatLongCommand(in double lat, in double lon)
        {
            Lat = lat;
            Lon = lon;
        }

        public int From { get; set; } = 0;
        public int To { get; set; } = 10;
    }
}
