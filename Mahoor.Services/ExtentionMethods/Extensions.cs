using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.User;
using Mahoor.Services.City.Dto;
using Mahoor.Services.Dtos;
using Mahoor.Services.Follow.Dto;
using Mahoor.Services.Review.Dto;
using Mahoor.Services.Timeline;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User.Follower.Dto;
using Mahoor.Services.User.Profile.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Formatters.Internal;
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
                Text =  post.Text,
                Medias = post.Medias.Select(m=> new TimelineMediaDto()
                {
                    Url = m.Path
                }).ToList(),
                PlaceName = post.PlaceName,
                Id = post.Id,
                CreatedDate = post.CreatedDate,
                Username =   post.User.UserName,
                
            };
        }


        public static TimelinePostDto ToTimelinePostDto(this JsonDocument data)
        {
            using (var memoryStream = new MemoryStream())
            {
                var jr = new Utf8JsonWriter(memoryStream);
                data.WriteTo(jr);
                jr.Flush();
               return   JsonSerializer.Deserialize<TimelinePostDto>(memoryStream.ToArray()); 
               
            }
           
        }


        public static FollowRequestDto ToFollowRequestModel(this UserModel user)
        {

            return new FollowRequestDto()
            {
                UserId = user.Id,
                Name =  $"{user.DisplayName}",
                AvatarUrl = user.AvatarUrl,
                Username = user.UserName
            };
        }

        public static ProfileDto ToProfileDtoModel(this UserModel user)
        {

            return new ProfileDto()
            {
                UserName = user.UserName,
                City =  user.CurrentCity,
                AvatarURl = user.AvatarUrl,
                Biography = user.Bio,
                Favorites = user.Favorites,
                Website =  user.Website,
                DisplayName = user.DisplayName,
            };
        }



        public static FollowerItemDto ToFollowerItemDto(this UserModel s)
        {
            return new FollowerItemDto()
            {
                Location = $"{s.City.City},{s.City.Province}",
                AvatarUrl = s.AvatarUrl,
                Username = s.UserName,
                FullName = $"{s.DisplayName}"

            };
        }

        public static CityDto ToCityDto(this CityModel city)
        {

            return new CityDto()
            {
                Id = city.Id,
                Name = $"{city.City},{city.Province}",


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
    }
}
