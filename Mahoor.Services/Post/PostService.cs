using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.DomainObjects.User;
using Mahoor.Services.Dtos;
using Mahoor.Services.Graph;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Post.Dto;
using Mahoor.Services.Post.Events;
using Mahoor.Services.Response;
using Mahoor.Services.User;
using MediatR;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Mahoor.Services.Post
{
    public class PostService : ServiceBase,IPostService
    {
        private readonly IGraphService _graphService;
        private readonly IAppRepository<PostModel, Guid> _postRepository;
        private readonly AppUserManager _userManager;
        private readonly IAppRepository<BasePlaceModel, Guid> _placeRepository;
        private readonly IMediator _mediator;
        private readonly AppDbContext _db;
        private readonly IAppRepository<ObjectModel, Guid> _objectRepository;

        public PostService(IGraphService graphService,IAppRepository<PostModel,Guid> postRepository,
                AppUserManager userManager,IAppRepository<BasePlaceModel,Guid> placeRepository,
                IMediator mediator,
                AppDbContext db,
                IAppRepository<ObjectModel,Guid> objectRepository
                )
        {
            _graphService = graphService;
            _postRepository = postRepository;
            _userManager = userManager;
            _placeRepository = placeRepository;
            _mediator = mediator;
            _db = db;
            _objectRepository = objectRepository;
        }

        public UserModel User { get; set; }
        public async Task<BaseServiceResponse<Guid>> CreatePost(CreatePostCommand command)
        {

            try
            {
                var user = await _userManager.UserManager.FindByIdAsync(command.UserId.ToString());
                if (user == null)
                {
                    return BaseServiceResponse<Guid>.FailedResponse("invalid user");
                }



                var place = await _placeRepository.GetByIdAsync(command.PlaceId);
//                var place = await _db.Set<BasePlaceModel>().FindAsync(command.PlaceId);
                if (place==null)
                {
                    return BaseServiceResponse<Guid>.FailedResponse("invalid place");

                }
                //save images 

                foreach (var media in command.Medias)
                {
                    var relativePath = $"/wwwroot/user/{user.UserName}/pictures/";
                    var directory = $"{ContentPath}{relativePath}";
                    var fileName = $"{Guid.NewGuid()}_{media.Name}";
                     var storagePath =    $"{directory}/{fileName}";
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
                    PlaceId = command.PlaceId,
                    PlaceName = place.Name
                };


                var postModel =await _postRepository.AddAsync(post);
                

             


                await _mediator.Publish(new PostCreatedEvent {Post = postModel});

                return BaseServiceResponse<Guid>.SuccessFullResponse(postModel.Id);
            }
            catch (Exception exception)
            {

                return BaseServiceResponse<Guid>.FailedResponse("error" , exception.ToString());
            }


           
        }

        public async Task<BaseServiceResponse<bool>> EditPost(EditPostCommand command)
        {
            var post = await _postRepository.GetByIdAsync(command.Id);
            if (post==null)
            {
                return  BaseServiceResponse<bool>.FailedResponse("invalid post id");
            }
            post.Text = command.Text;
            await _postRepository.UpdateAsync(post);
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }

        public async Task<BaseServiceResponse<bool>> DeletePost(DeletePostCommand command)
        {
            
            await _postRepository.DeleteByIdAsync(command.PostId);
            return BaseServiceResponse<bool>.SuccessFullResponse(true);
        }

        public async Task<BaseServiceResponse<PostModel>> GetPostById(Guid Id)
        {
            var post = await _postRepository.GetByIdAsync(Id);
            var postdto = new PostDto()
            {
                User =  post.User,
                Text =  post.Text,
                Medias =  post.Medias,
                Place = post.Place
            };
           return BaseServiceResponse<PostModel>.SuccessFullResponse(post);
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
