using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Post;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Data.Queries.Post
{
   public sealed class GetPostByIdQuery : BaseSpecification<PostModel,Guid>
    {
        public GetPostByIdQuery(Guid postId)
        {
            AddCriteria(p => p.Id == postId);
            ApplyPaging(0, 1);
        }
    }
}
