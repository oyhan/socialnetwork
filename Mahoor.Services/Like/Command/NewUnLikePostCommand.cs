using System;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Like.Command
{
    public class NewUnLikePostCommand : IRequest<BaseServiceResponse<bool>>
    {
        public NewUnLikePostCommand(Guid userId, Guid postId)
        {
            UserId = userId;
            PostId = postId;
        }

        /// <summary>
        /// the user who likes the post
        /// </summary>
        public Guid  UserId { get; set; }
        /// <summary>
        /// the post user likes it
        /// </summary>
        public Guid PostId { get; set; }
    }
}
