using System;
using System.Collections.Generic;
using System.Text;
using StackExchange.Redis;

namespace Mahoor.Services.Redis
{
    public class KeyMaker
    {
        public static RedisKey CreateForTimeline(string userid)
        {
            return $"user:{userid}:timeline";
        }

        public static RedisKey UserFollowersNumber(string userid)
        {

              return $"user:{userid}:followers";
        }

    }
}
