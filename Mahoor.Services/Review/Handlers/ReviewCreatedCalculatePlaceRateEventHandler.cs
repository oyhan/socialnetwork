using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Review;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.Graph;
using Mahoor.Services.Review.Events;
using MediatR;

namespace Mahoor.Services.Review.Handlers
{
   public class ReviewCreatedCalculatePlaceRateEventHandler :INotificationHandler<ReviewCreatedEvent>
    {
        private readonly IAppRepository<BasePlaceModel, Guid> _placeRepository;
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;

        public ReviewCreatedCalculatePlaceRateEventHandler(IAppRepository<BasePlaceModel,Guid> placeRepository,IAppRepository<ReviewModel,Guid> reviewRepository)
        {
            _placeRepository = placeRepository;
            _reviewRepository = reviewRepository;
        }
        public async Task Handle(ReviewCreatedEvent notification, CancellationToken cancellationToken)
        {
            var place = await _placeRepository.GetByIdAsync(notification.Review.PlaceId);
            var averageRate = (await _reviewRepository.ListAsync(r => new ReviewModel()
                {
                    Rate = r.Rate
                }, new GetPlaceReviewRatesQuery(notification.Review.PlaceId))).ToList()
                .Average(c => c.Rate);
            place.Rate = (float) averageRate;

            await _placeRepository.UpdateAsync(place);
           
        }
    }
}
