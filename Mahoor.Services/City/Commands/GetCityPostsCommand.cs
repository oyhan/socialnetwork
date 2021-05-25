using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.City.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.City.Commands
{
    public class GetCityPostsCommand : IRequest<BaseServiceResponse<List<CityPostListDto>>>, IQuery
    {
        public GetCityPostsCommand(int from ,int to,Guid cityId)
        {
            From = from;
            To = to;
            CityId = cityId;
        }
        public Guid CityId { get; set; }

        public int From { get; set; }
        public int To { get; set; }
    }
}
