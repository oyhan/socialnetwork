using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Timeline.Dtos;

namespace Mahoor.Services.Timeline
{
   public  interface ITimelineService
   {
       Task<IReadOnlyList<TimelinePostDto>> ListFollowingsPosts(Guid userId , int from ,int to );

       Task AddPostToTimeline(string userId, PostModel post);
   }
}
