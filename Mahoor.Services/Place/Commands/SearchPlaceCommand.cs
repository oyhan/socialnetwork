using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class SearchPlaceCommand : IRequest<BaseServiceResponse<List<PlaceSearchDto>>>, IAppBaseRequest
    {
        public string Requester { get; set; }
        public string Name { get;private set; }
        public Guid? CityId { get; set; }

        public SearchPlaceCommand(string name,Guid? cityId)
        {
            Name = name;
            CityId = cityId;
        }

    }
}
