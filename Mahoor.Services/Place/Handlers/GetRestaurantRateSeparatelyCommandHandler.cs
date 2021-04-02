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
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.Place.Handlers
{
    public class GetRestaurantRateSeparatelyCommandHandler : IRequestHandler<GetRestaurantRateSeparatelyCommand,BaseServiceResponse<PlaceRateDto>>
    {
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;

        public GetRestaurantRateSeparatelyCommandHandler(IAppRepository<ReviewModel, Guid> reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }
        public async Task<BaseServiceResponse<PlaceRateDto>> Handle(GetRestaurantRateSeparatelyCommand request, CancellationToken cancellationToken)
        {
            var rates = await _reviewRepository.ListAsync(new GetPlaceReviewRatesSeparatelyQuery(request.PlaceId)
            );
            var grouped = rates.GroupBy(r => r.Rate).ToList();
            var dto =  new PlaceRateDto()
            {
                Horrible = grouped.Count(c=>c.Key==1),
                Weak = grouped.Count(c=>c.Key==2),
                Normal = grouped.Count(c=>c.Key==3),
                VeryGood = grouped.Count(c=>c.Key==4),
                Excellent = grouped.Count(c=>c.Key==5),
            };
         return BaseServiceResponse<PlaceRateDto>.SuccessFullResponse(dto);

        }

        public class ReviewRateSelectModel
        {
            public int Rate { get; set; }
            public Guid Id { get; set; }
        }


    }
}
