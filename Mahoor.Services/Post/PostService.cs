using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Post;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.DomainObjects.User;
using Mahoor.Services.Dtos;
using Mahoor.Services.Graph;
using Mahoor.Services.Helper;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Post.Dto;
using Mahoor.Services.Post.Events;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Mahoor.Services.Post
{
    public class PostService : ServiceBase, IPostService
    {
        private readonly IGraphService _graphService;
        private readonly IAppRepository<PostModel, Guid> _postRepository;
        private readonly AppUserManager _userManager;
        private readonly IAppRepository<BasePlaceModel, Guid> _placeRepository;
        private readonly IMediator _mediator;
        private readonly AppDbContext _db;
        private readonly IAppRepository<ObjectModel, Guid> _objectRepository;
        private readonly IAppRepository<CityModel, Guid> _cityRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PostService(IGraphService graphService, IAppRepository<PostModel, Guid> postRepository,
                AppUserManager userManager, IAppRepository<BasePlaceModel, Guid> placeRepository,
                IMediator mediator,
                AppDbContext db,
                IAppRepository<ObjectModel, Guid> objectRepository,
                IHttpContextAccessor httpContextAccessor,
                IAppRepository<CityModel, Guid> cityRepository
                )
        {
            _httpContextAccessor = httpContextAccessor;
            _graphService = graphService;
            _postRepository = postRepository;
            _userManager = userManager;
            _placeRepository = placeRepository;
            _mediator = mediator;
            _db = db;
            _objectRepository = objectRepository;
            _cityRepository = cityRepository;
        }

        public UserModel User { get; set; }
        public async Task<BaseServiceResponse<Guid>> CreatePost(CreatePostCommand command)
        {

            try
            {
                if (IsInValidRequest(command))
                {
                    return BaseServiceResponse<Guid>.FailedResponse("it can't be both city and place empty neither both have value");
                }
                CityModel city = null;
                BasePlaceModel place = null;
                var placeName = "";
                var user = await _userManager.UserManager.FindByIdAsync(command.UserId.ToString());
                if (user == null)
                {
                    return BaseServiceResponse<Guid>.FailedResponse("invalid user");
                }


                if (command.PlaceId != null)
                {
                    place = await _placeRepository.GetByIdAsync(command.PlaceId.Value);
                    placeName = place.Name;
                    //                var place = await _db.Set<BasePlaceModel>().FindAsync(command.PlaceId);
                    if (place == null)
                    {
                        return BaseServiceResponse<Guid>.FailedResponse("invalid place");

                    }
                }

                if (command.CityId != null)
                {
                    city = await _cityRepository.GetByIdAsync(command.CityId.Value);
                    placeName = $"{city.City},{city.Province}";
                    //                var place = await _db.Set<BasePlaceModel>().FindAsync(command.PlaceId);
                    if (city == null)
                    {
                        return BaseServiceResponse<Guid>.FailedResponse("invalid place");

                    }
                }
                //save images 

                foreach (var media in command.Medias)
                {
                    var relativePath = $"/user/{user.UserName}/post/";
                    var directory = $"{ContentPath}{relativePath}";
                    var fileName = GetImageName(media);
                    var storagePath = $"{directory}/{fileName}";
                    if (!Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }
                    using (var fileStream = new FileStream(storagePath, FileMode.CreateNew))
                    {
                        await media.File.CopyToAsync(fileStream);

                        fileStream.Close();
                    }

                    media.Path = $"{relativePath}{fileName}";
                }
                var post = new PostModel()
                {
                    Medias = command.Medias.Select(ToMedia).ToList(),
                    Text = command.Text,
                    UserId = command.UserId.ToString(),
                    PlaceName = placeName,
                };

                if (place != null)
                {
                    post.Place = place;
                    post.PlaceId = place.Id;

                }
                else
                {
                    post.City = city;
                    post.CityId = city.Id;
                }


                var postModel = await _postRepository.AddAsync(post);





                await _mediator.Publish(new PostCreatedEvent { Post = postModel });

                return BaseServiceResponse<Guid>.SuccessFullResponse(postModel.Id);
            }
            catch (Exception exception)
            {

                return BaseServiceResponse<Guid>.FailedResponse("error", exception.ToString());
            }



        }

        private bool IsInValidRequest(CreatePostCommand command)
        {
            var bothHasValue = command.CityId != null && command.PlaceId != null;
            var bothEmpty = command.CityId == null && command.PlaceId == null;
            return bothHasValue || bothEmpty;
        }

        private string GetImageName(MediaDto media)
        {
            return $"{Guid.NewGuid()}_{media.Name}.{media.MimeType.Split('/')[1]}";
        }

        public async Task<BaseServiceResponse<bool>> EditPost(EditPostCommand command)
        {
            var post = await _postRepository.GetByIdAsync(command.Id);
            if (post == null)
            {
                return BaseServiceResponse<bool>.FailedResponse("invalid post id");
            }
            post.Text = command.Text;
            await _postRepository.UpdateAsync(post);
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }

        public async Task<BaseServiceResponse<bool>> DeletePost(DeletePostCommand command)
        {

            await _postRepository.DeleteByIdAsync(command.PostId);
            await _graphService.DeleteAssociation(command.Requester, command.PostId, AType.Authored);
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }

        public async Task<BaseServiceResponse<TimelinePostDto>> GetPostById(Guid id)
        {
            var userId = _httpContextAccessor.HttpContext.User.Id();
            var likesCount = await _graphService.GetAssociationCountTo(id, AType.Likes);
            var likedByUser = await _graphService.HasAssociation(Guid.Parse(userId), id, AType.Likes);
            var posts = await _postRepository.ListAsync(p => new TimelinePostDto()
            {
                CreatedDate = p.CreatedDate,
                UserName = p.User.UserName,
                Liked = likedByUser,
                Likes = likesCount,
                Medias = p.Medias.Select(m => new TimelineMediaDto
                {
                    Url = m.Path
                }),
                Id = p.Id,
                PlaceName = p.PlaceName,
                Text = p.Text,
                AvatarUrl = p.User.AvatarUrl
            }, new GetPostByIdQuery(id));
            if (posts.Count == 0)
            {
                return BaseServiceResponse<TimelinePostDto>.FailedResponse("post not found");
            }
            return BaseServiceResponse<TimelinePostDto>.SuccessFullResponse(posts.FirstOrDefault());
        }

        public Media ToMedia(MediaDto dto)
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
    }
}
