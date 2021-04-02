using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Dtos;
using Mahoor.Services.Request;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Place.Commands
{
    public class PlaceGetPhotosCommand: BasePagedRequest<BaseServiceResponse<List<MediaDto>>>
    {
        public PlaceGetPhotosCommand(Guid placeId,int from,int to)
        {
            PlaceId = placeId;
            From = from;
            To = to;
        }

        public Guid PlaceId { get; }
       
    }
}
