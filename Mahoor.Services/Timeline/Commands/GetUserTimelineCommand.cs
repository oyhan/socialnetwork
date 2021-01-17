using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;

namespace Mahoor.Services.Timeline.Commands
{
    public class GetUserTimelineCommand : IRequest<BaseServiceResponse<TimelineDto>>
    {
        public Guid UserId { get; }
        public double Lat { get; }
        public double Lon { get; }

        public GetUserTimelineCommand(Guid userId , double lat, double lon)
        {
            UserId = userId;
            Lat = lat;
            Lon = lon;
        }
    }
}
