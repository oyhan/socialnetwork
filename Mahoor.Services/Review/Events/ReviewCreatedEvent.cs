using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.Review;
using MediatR;

namespace Mahoor.Services.Review.Events
{
    public class ReviewCreatedEvent :INotification
    {
        public ReviewModel Review { get; set; }
    }
}
