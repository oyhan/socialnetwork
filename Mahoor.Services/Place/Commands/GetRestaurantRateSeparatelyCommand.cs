using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class GetRestaurantRateSeparatelyCommand : IRequest<BaseServiceResponse<PlaceRateDto>> ,IAppBaseRequest
    {
        public Guid PlaceId { get; }

       
        public GetRestaurantRateSeparatelyCommand(Guid placeId)
        {
            PlaceId = placeId;
        }

        public string Requester { get; set; }
    }
}
