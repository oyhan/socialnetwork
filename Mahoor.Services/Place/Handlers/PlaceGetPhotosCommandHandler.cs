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
using Mahoor.Services.Dtos;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Response;
using MediatR;
using Serilog;

namespace Mahoor.Services.Place.Handlers
{
    public class PlaceGetPhotosCommandHandler:IRequestHandler<PlaceGetPhotosCommand,BaseServiceResponse<List<MediaDto>>>
    {
        private readonly IAppRepository<BasePlaceModel, Guid> _placeRepository;
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;

        public PlaceGetPhotosCommandHandler(IAppRepository<BasePlaceModel,Guid> placeRepository, IAppRepository<ReviewModel,Guid> _reviewRepository)
        {
            _placeRepository = placeRepository;
            this._reviewRepository = _reviewRepository;
        }
        public async Task<BaseServiceResponse<List<MediaDto>>> Handle(PlaceGetPhotosCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var place =await _placeRepository.GetByIdAsync(request.PlaceId,p=>p.Medias);

                var placeReviewsMedias = await _reviewRepository.ListAsync(r=>r.Medias,
                    new GetRestaurantReviewsOrderedByDateVisitedDescQuery(request.PlaceId, request.From, request.To));

                var placePhotos = new List<MediaDto>();

                placePhotos.AddRange(place.Medias.Select(m=>m.ToMediaDto()));
                placePhotos.AddRange(placeReviewsMedias.SelectMany(m=>m).Select(m=>m.ToMediaDto()));

                return BaseServiceResponse<List<MediaDto>>.SuccessFullResponse(placePhotos);
            }
            catch (Exception e)
            {
                Log.Logger.Fatal("exception in fetching place photos {e}", e);
                return BaseServiceResponse<List<MediaDto>>.FailedResponse("exception in fetching place photos");
            }
        }
    }
}
