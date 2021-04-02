using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;

namespace Mahoor.Services.Request
{
    public abstract class BaseRequest :IAppBaseRequest
    {
        public string Requester { get; }
    }
}
