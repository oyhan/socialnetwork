using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Post.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;

namespace Mahoor.Services.Post
{
    public interface IPostService
    {

        Task<BaseServiceResponse<Guid>> CreatePost(CreatePostCommand command);
        Task<BaseServiceResponse<bool>> EditPost(EditPostCommand command);
        Task<BaseServiceResponse<bool>> DeletePost(DeletePostCommand command);
        Task<BaseServiceResponse<TimelinePostDto>> GetPostById(Guid Id);

    }
}
