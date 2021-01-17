using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class GetRestaurantDetailedCommand :IRequest<BaseServiceResponse<RestaurantDetailDto>> ,IAppBaseRequest
    {
        public double Lat { get; }
        public double Lon { get; }
        public Guid RestaurantId { get; }

       
        public GetRestaurantDetailedCommand(Guid restaurantId, in double lat, in double lon)
        {
            Lat = lat;
            Lon = lon;
            RestaurantId = restaurantId;
        }

        public string Requester { get; set; }
    }
}
