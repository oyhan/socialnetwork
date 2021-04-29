using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace Mahoor.Services.Request
{
    public abstract class BasePagedRequest<T>:BaseRequest, IRequest<T>
    {
        public int From { get; protected set; } = 0;
        public int To { get; protected set; } = 20;
    }
}
