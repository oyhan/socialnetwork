using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Dtos;
using Mahoor.Services.Response;
using Mahoor.Services.Review.Dto;
using MediatR;

namespace Mahoor.Services.Review.Commands
{
    public class CreateReviewCommand : IRequest<BaseServiceResponse<Guid>>, IAppBaseRequest
    {

        public ReviewDto Dto { get; set; }
        public string Requester { get; set; }
    }
}
