using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class PlaceRemoveFromFavoriteCommand : IRequest<BaseServiceResponse<bool>> ,IAppBaseRequest
    {
        public string Requester { get; }
        public Guid PlaceId { get; set; }

        public PlaceRemoveFromFavoriteCommand(string requester,Guid placeId)
        {
            Requester = requester;
            PlaceId =placeId;
        }
    }
}
