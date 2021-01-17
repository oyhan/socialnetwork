using System;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Like.Command
{
    public class NewLikePostCommand:IRequest<BaseServiceResponse<bool>>
    {
        public NewLikePostCommand(Guid userId, Guid postId)
        {
            UserId = userId;
            PostId = postId;
        }

        /// <summary>
        /// the user who unlikes the post
        /// </summary>
        public Guid UserId { get; set; }
        /// <summary>
        /// the post user unlikes it
        /// </summary>
        public Guid PostId { get; set; }
    }
}
