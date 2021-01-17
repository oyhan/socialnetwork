using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Post.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using MediatR;

namespace Mahoor.Services.Post.Commands
{
   public class GetPostByIdCommand :IRequest<BaseServiceResponse<TimelinePostDto>>
    {
        public Guid PostId { get; set; }
        public Guid Requester { get; set; }
    }
}
