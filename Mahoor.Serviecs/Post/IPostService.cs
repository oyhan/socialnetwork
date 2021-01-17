using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Services.Commands.Post;
using Mahoor.Services.Response;

namespace Mahoor.Services.Post
{
    public interface IPostService
    {

        Task<BaseServiceResponse<bool>> CreatePost(CreatePostCommand command);
        Task<BaseServiceResponse<bool>> EditPost(EditPostCommand command);
        Task<BaseServiceResponse<bool>> DeletePost(DeletePostCommand command);
        Task<BaseServiceResponse<bool>> GetPostById(Guid Id);

    }
}
