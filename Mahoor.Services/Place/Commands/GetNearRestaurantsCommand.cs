using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class GetNearRestaurantsCommand : IRequest<BaseServiceResponse<List<RestaurantDto>>>, IAppBaseRequest
    {
        public GetNearRestaurantsCommand(string userId)
        {
            Requester = userId;
        }

        public string Requester { get; set; }
    }
}
