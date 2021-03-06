using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Request;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class GetNearRestaurantsCommand : BasePagedRequest<BaseServiceResponse<List<RestaurantDto>>>, IAppBaseRequest
    {
        public GetNearRestaurantsCommand(string userId, int from, int to)
        {
            Requester = userId;
            From = from;
            To = to;
        }

        public string Requester { get; set; }
    }
}
