using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.Comment;
using Mahoor.Services.Commands.Comment;

namespace Mahoor.Services.Comment
{
    public interface ICommentService
    {
         bool CreateComment(CreateCommentCommand command);
         List<CommentModel> ListCommentByPostId(Guid postId);
    }
}
