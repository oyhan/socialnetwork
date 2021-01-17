using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Commands.Post;
using Mahoor.Services.Graph;
using Mahoor.Services.Response;
using PSYCO.Common.Interfaces;
using StackExchange.Redis;

namespace Mahoor.Services.Post
{
    public class PostService : IPostService
    {
        private readonly IGraphService _graphService;
        private readonly AppRepository<PostModel, Guid> _postRepository;

        public PostService(IGraphService graphService,AppRepository<PostModel,Guid> postRepository)
        {
            _graphService = graphService;
            _postRepository = postRepository;
        }
        public Task<BaseServiceResponse<bool>> CreatePost(CreatePostCommand command)
        {
            throw new NotImplementedException();
        }

        public Task<BaseServiceResponse<bool>> EditPost(EditPostCommand command)
        {
            throw new NotImplementedException();
        }

        public Task<BaseServiceResponse<bool>> DeletePost(DeletePostCommand command)
        {
            throw new NotImplementedException();
        }

        public Task<BaseServiceResponse<bool>> GetPostById(Guid Id)
        {
            throw new NotImplementedException();
        }
    }
}
