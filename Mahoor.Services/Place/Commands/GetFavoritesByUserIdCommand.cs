using Mahoor.Services.Helper;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Request;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Place.Commands
{
    public class GetFavoritesByUserIdCommand : BasePagedRequest<BaseServiceResponse<List<RestaurantDetailDto>>>
    {
        public Guid UserId { get; }

        public GetFavoritesByUserIdCommand(Guid userId ) 
        {
           UserId = userId;
        }
    }
}
