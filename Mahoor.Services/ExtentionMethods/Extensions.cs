using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.User;
using Mahoor.Services.City.Dto;
using Mahoor.Services.Dtos;
using Mahoor.Services.Follow.Dto;
using Mahoor.Services.Review.Dto;
using Mahoor.Services.Timeline;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User.Dto;
using Mahoor.Services.User.Follower.Dto;
using Mahoor.Services.User.Profile.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Formatters.Internal;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Mahoor.Services.ExtentionMethods
{
    public static class Extensions
    {
        public static JsonDocument ToJsonDocument<TId>(this BaseModel<TId> obj)
        {
            var jsonSettings = new JsonSerializerSettings();
            jsonSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return JsonDocument.Parse(JsonConvert.SerializeObject(obj, jsonSettings));
        }
        public static JsonDocument ToJsonDocument(this object obj)
        {
            var jsonSettings = new JsonSerializerSettings();
            jsonSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return JsonDocument.Parse(JsonConvert.SerializeObject(obj, jsonSettings));
        }




        public static TimelinePostDto ToTimelinePostDto(this PostModel post)
        {
            return new TimelinePostDto()
            {
                Text = post.Text,
                Medias = post.Medias.Select(m => new TimelineMediaDto()
                {
                    Url = m.Path
                }).ToList(),
                PlaceName = post.PlaceName,
                Id = post.Id,
                CreatedDate = post.CreatedDate,
                UserName = post.User.UserName,

            };
        }


        public static TimelinePostDto ToTimelinePostDto(this JsonDocument data)
        {
            using (var memoryStream = new MemoryStream())
            {
                var jr = new Utf8JsonWriter(memoryStream);
                data.WriteTo(jr);
                jr.Flush();
                return JsonSerializer.Deserialize<TimelinePostDto>(memoryStream.ToArray());

            }

        }




        public static FollowRequestDto ToFollowRequestModel(this UserModel user)
        {

            return new FollowRequestDto()
            {
                UserId = user.Id,
                Name = $"{user.DisplayName}",
                AvatarUrl = user.AvatarUrl,
                UserName = user.UserName
            };
        }

        public static UserSearchResultDto ToSearchDto(this UserModel user)
        {

            return new UserSearchResultDto()
            {
                UserName=user.UserName,
                DisplayName=user.DisplayName,
                NumberOfFollowers = user.NumberOfFollowers,
                Id=user.Id,
                AvatarUrl = user.AvatarUrl

            };
        }

        public static ProfileDto ToProfileDtoModel(this UserModel user)
        {

            return new ProfileDto()
            {
                UserName = user.UserName.ToLower(),
                City = user.CurrentCity??"",
                AvatarURl = user.AvatarUrl,
                Bio = user.Bio??"",
                Favorites = user.Favorites,
                Website = user.Website??"",
                DisplayName = user.DisplayName??"",
                CityId = user.CityId,
                HeaderPic = user.ProfileHeaderPicture
            };
        }



        public static FollowerItemDto ToFollowerItemDto(this UserModel s)
        {
            return new FollowerItemDto()
            {
                //Location = $"{s.City.City},{s.City.Province}",
                City = s.City.City,
                Province = s.City.Province,
                AvatarUrl = s.AvatarUrl,
                UserName = s.UserName,
                FullName = $"{s.DisplayName}"

            };
        }

        public static CityHomeDto ToCityHomeDto(this CityModel city)
        {

            return new CityHomeDto()
            {
                Id = city.Id,
                Name = $"{city.City},{city.Province}",
                //LastPhoto = city.Posts.OrderByDescending(p=>p.CreatedDate).FirstOrDefault().Medias.LastOrDefault().Path,
                PhotosCount=city.Posts.Count()
            };
        }


        public static Media ToMedia(this MediaDto dto)
        {
            return new Media()
            {

                Size = (int)dto.Size,
                MediaType = MediaType.Picture,
                MimeType = dto.MimeType,
                Path = dto.Path,
                Name = dto.Name,

            };
        }

        public static MediaDto ToMediaDto(this Media model)
        {
            return new MediaDto()
            {
                Name = model.Name,
                MimeType = model.MimeType,
                Path = model.Path
            };
        }


        public static ReviewDto ToReviewDto(this ReviewModel review)
        {

            return new ReviewDto()
            {
                Description = review.Description,
                Medias = review.Medias.Select(m => new MediaDto()
                {
                    Path = m.Path,
                    Name = m.Name,
                    MimeType = m.MimeType
                }).ToList(),
                PlaceId = review.PlaceId,
                PlaceName = review.PlaceName,
                Rate = review.Rate,
                DateVisited = review.DateVisited,
                Title = review.Title
            };
        }

        public static RestaurantDto ToDto(this RestaurantModel r, Func<bool> hasFaved, Geometry userLocation)
        {
            return new RestaurantDto()
            {
                Name = r.Name,
                DistanceInMeter = r.Location.Distance(userLocation),
                Avatar = r.Avatar,
                Rate = r.Rate,
                Location = r.Location,
                Id = r.Id,
                NoOfReviews = r.Reviews.Count,
                Favorite = hasFaved()
            };
        }
    }
}
