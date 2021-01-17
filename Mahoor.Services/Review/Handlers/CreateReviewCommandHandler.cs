using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Mahoor.Services.Post.Events;
using Mahoor.Services.Response;
using Mahoor.Services.Review.Commands;
using Mahoor.Services.Review.Events;
using Mahoor.Services.User;
using MediatR;

namespace Mahoor.Services.Review.Handlers
{
    class CreateReviewCommandHandler :IRequestHandler<CreateReviewCommand,BaseServiceResponse<Guid>>
    {
        private readonly IAppRepository<BasePlaceModel, Guid> _placeRepository;
        private readonly IGraphService _graphService;
        private readonly AppUserManager _userManager;
        private readonly IMediator _mediator;
        private readonly IAppRepository<ReviewModel, Guid> _reviewRepository;

        public CreateReviewCommandHandler(IAppRepository<BasePlaceModel,Guid> placeRepository, IGraphService graphService, AppUserManager userManager,IMediator mediator , IAppRepository<ReviewModel,Guid> reviewRepository)
        {
            _placeRepository = placeRepository;
            _graphService = graphService;
            _userManager = userManager;
            _mediator = mediator;
            _reviewRepository = reviewRepository;
        }

        public async Task<BaseServiceResponse<Guid>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userManager.UserManager.FindByIdAsync(request.Requester);
                if (user == null)
                {
                    return BaseServiceResponse<Guid>.FailedResponse("invalid user");
                }



                                var place = await _placeRepository.GetByIdAsync(request.Dto.PlaceId);
                //                var place = await _db.Set<BasePlaceModel>().FindAsync(command.PlaceId);
                                if (place==null)
                                {
                                    return BaseServiceResponse<Guid>.FailedResponse("invalid place");
                
                                }
//                save images 

                foreach (var media in request.Dto.Medias)
                {
                    var relativePath = $"/user/{user.UserName}/pictures/";
                    var directory = $"{Directory.GetCurrentDirectory()}{relativePath}";
                    var fileName = $"{Guid.NewGuid()}_{media.Name}";
                    var storagePath = $"{directory}/{fileName}";
                    if (!Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }
                    using (var fileStream = new FileStream(storagePath, FileMode.CreateNew))
                    {
                        await media.File.CopyToAsync(fileStream);

                        fileStream.Close();
                    }

                    media.Path = $"{relativePath}{fileName}";
                }
                var review = new ReviewModel()
                {
                    Medias = request.Dto.Medias.ToList().Select(s=>s.ToMedia()).ToList(),
                    Description = request.Dto.Description,
                    UserId = request.Requester,
                    PlaceId = request.Dto.PlaceId,
                    Rate = request.Dto.Rate,
                    Title = request.Dto.Title,
                    DateVisited = request.Dto.DateVisited,
                    PlaceName = place.Name
                     
                };


                var reviewModel = await _reviewRepository.AddAsync(review);




                await _graphService.AddAssociation(Guid.Parse(request.Requester), reviewModel.Id, AType.Wrote
                    , reviewModel.ToReviewDto());

                await _mediator.Publish(new ReviewCreatedEvent { Review = reviewModel });

                return BaseServiceResponse<Guid>.SuccessFullResponse(reviewModel.Id);
            }
            catch (Exception exception)
            {

                return BaseServiceResponse<Guid>.FailedResponse("error", exception.ToString());
            }
        }
    }
}
