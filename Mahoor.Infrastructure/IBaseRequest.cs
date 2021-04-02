using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Infrastructure
{
    public interface IAppBaseRequest
    { 
        string Requester { get; }
    }
}
