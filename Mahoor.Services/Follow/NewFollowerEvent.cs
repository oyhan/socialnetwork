using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace Mahoor.Services.Follow
{
    class NewFollowerEvent : INotification
    {
        public Guid UserFollowing { get; }
        public Guid UserFollowed { get; }

        public NewFollowerEvent(Guid userFollowing, Guid userFollowed)
        {
            UserFollowing = userFollowing;
            UserFollowed = userFollowed;
        }
    }
}
