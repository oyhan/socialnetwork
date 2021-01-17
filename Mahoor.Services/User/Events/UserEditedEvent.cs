using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace Mahoor.Services.Events
{
    class UserEditedEvent : INotification
    {
        public string UserId { get; set; }
    }
}
