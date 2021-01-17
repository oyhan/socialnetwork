using System;
using System.Collections.Generic;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Post.Commands
{
    public class EditPostCommand :  IRequest<BaseServiceResponse<bool>>
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
    }
}
