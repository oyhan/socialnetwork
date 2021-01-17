using System;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Post.Commands
{
  public  class DeletePostCommand : IRequest<BaseServiceResponse<bool>>
    {
        public Guid PostId { get; set; }
        public Guid Requester { get; set; }
    }
}
