using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Graph;
using Mahoor.Data.Queries.Timeline;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Post;
using Mahoor.Services.Post.Dto;
using Mahoor.Services.Redis;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User;
using SmartFormat.Utilities;
using StackExchange.Redis;

namespace Mahoor.Services.Timeline
{
    public class TimelineService : ITimelineService
    {
        private readonly IRedisService _redisService;
        private readonly IDatabase _database;
        private readonly AppUserManager _userManager;
        private readonly IGraphService _graphService;
        private readonly IAppRepository<PostModel, Guid> _postRepository;
        private readonly IAppRepository<AssociationModel, Guid> _associationRepository;
        private readonly AppDbContext _db;

        public TimelineService(IRedisService redisService, IDatabase database,IGraphService graphService,
            AppUserManager userManager,
            IAppRepository<PostModel,Guid> postRepository , IAppRepository<AssociationModel,Guid> associationRepository,AppDbContext db)
        {
            _redisService = redisService;
            _database = database;
            _userManager = userManager;
            _graphService = graphService;
            _postRepository = postRepository;
            _associationRepository = associationRepository;
            _db = db;
        }
        /// <summary>
        /// list the posts of users whom the user follows
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IReadOnlyList<TimelinePostDto>> ListFollowingsPosts(Guid userId ,int from , int to )
        {
//           var ass = _db.Associations.First();
           
            var followingsIds = (await _graphService.GetAssociationsFrom(userId, AType.Following));
            followingsIds.Add(userId);
            var followingIdList = followingsIds.Select(s => s.ToString()).ToList();
            var posts =await _postRepository.ListAsync(s=>s.ToTimelinePostDto(),new GetUserTimelinePosts(followingIdList,from , to));
            var followingGuids = followingsIds.Select(d=>d.ToString());
            // var posts = await _associationRepository.ListAsync(s => s.Data.ToTimelinePostDto(),
            //     new GetUserFollowingsPosts( followingsIds));
            var usersFollowing = _userManager.UserManager.Users.Where(u => followingGuids.Contains(u.Id)).Select(u=>new { u.Id,u.UserName,u.AvatarUrl });
            foreach (var post in posts)
            {
                post.Likes =await _graphService.GetAssociationCountTo(post.Id, AType.Likes);
                post.Liked = await _graphService.HasAssociation(userId, post.Id, AType.Likes);
                post.AvatarUrl = usersFollowing.FirstOrDefault(u => u.UserName == post.UserName)?.AvatarUrl;
            }

            return posts;
        }

        public Task AddPostToTimeline(string userId, PostModel post)
        {
            return null;
        }




//        public Task AddPostToTimeline(string userId, PostModel post)
//        {
//            var postDto = new TimelinePostDto()
//            {
//                Text = post.Text,
//                Medias = post.Medias,
//                Likes = 0,
//                PlaceName = post.Place.DisplayName,
//
//
//            };
//            _database.HashSet("Asd", postDto.ConvertToHashEntryList().ToArray());
//            _redisService.PushToList(KeyMaker.CreateForTimeline(userId), postDto.ConvertToHashEntryList());
//
//        }
    }
}
