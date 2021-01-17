using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.Post;
using MediatR;

namespace Mahoor.Services.Post.Events
{
    class PostCreatedEvent:INotification
    {
        public PostModel Post { get; set; }
    }
}
