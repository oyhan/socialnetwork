using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ChefCode.Common.BaseModels;
using StackExchange.Redis;

namespace Mahoor.Data
{
    public class RedisRepository<TEntity> : IInMemoryRepository<TEntity> where TEntity :BaseModel<Guid>
    {
        private readonly IDatabase _redis;

        public RedisRepository(IDatabase redis)
        {
            _redis = redis;
        }
        public async Task AddAsync(TEntity entity)
        {

            var value = JsonSerializer.Serialize(entity, entity.GetType());
           
            await _redis.StringSetAsync(entity.Id.ToString(), value);
            
        }

        

        public async Task<TEntity> GetAsync(Guid id)
        {
            var redisValue= await _redis.StringGetAsync(id.ToString());
            if (redisValue.HasValue || !redisValue.IsNullOrEmpty)
            {
                var value = JsonSerializer.Deserialize<TEntity>(redisValue.ToString());
                return value;
            }

            return null;
        }
    }
}
