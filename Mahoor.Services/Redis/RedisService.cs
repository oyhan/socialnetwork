using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace Mahoor.Services.Redis
{
    public class RedisService:IRedisService
    {
        private readonly IDatabase _redis;

        public RedisService(IDatabase redis)
        {
            _redis = redis;
        }
        public async Task PushToList<TValue>(string key, TValue value)
        {
            var valueStr = JsonSerializer.Serialize(value, typeof(TValue));
           await _redis.ListLeftPushAsync(key, valueStr);

        }


        public async Task<bool> HashSet(string key, object value)
        {
            _redis.HashSet(key, value.ConvertToHashEntryList().ToArray());
            return true;
        }


    }
}
