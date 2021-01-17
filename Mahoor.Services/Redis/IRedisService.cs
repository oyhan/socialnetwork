using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mahoor.Services.Redis
{
    public interface IRedisService
    {
        Task PushToList<TValue>(string key, TValue value);
    }
}
