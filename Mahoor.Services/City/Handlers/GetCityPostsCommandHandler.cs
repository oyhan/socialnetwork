using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.City;
using Mahoor.Data.Queries.Post;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.City.Commands;
using Mahoor.Services.City.Dto;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Response;
using MediatR;
using Serilog;

namespace Mahoor.Services.City.Handlers
{
    public class GetCityPostsCommandHandler : IRequestHandler<GetCityPostsCommand, BaseServiceResponse<List<CityPostListDto>>>
    {
        private readonly IAppRepository<CityModel, Guid> _cityRepository;
        private readonly IAppRepository<PostModel, Guid> _postRepository;

        public GetCityPostsCommandHandler(IAppRepository<CityModel, Guid> cityRepository, IAppRepository<PostModel, Guid> postRepository)
        {
            _cityRepository = cityRepository;
            _postRepository = postRepository;
        }
        public async Task<BaseServiceResponse<List<CityPostListDto>>> Handle(GetCityPostsCommand request, CancellationToken cancellationToken)
        {

            try
            {
                var lastPosts = await _postRepository.ListAsync(p => new CityPostListDto
                {
                    Id = p.Id,
                    CoverPhoto = p.Medias.First().Path
                },
                new GetLastPostsOfCityQuery(request.CityId, request.From, request.To));
                var lastPostsList = lastPosts.ToList();
                return BaseServiceResponse<List<CityPostListDto>>.SuccessFullResponse(lastPostsList);
            }
            catch (Exception ex)
            {
                Log.Logger.Fatal("exception in fetching city posts {ex}", ex);
                return BaseServiceResponse<List<CityPostListDto>>.FailedResponse("exception in fetching city posts");
            }
        }
    }

}
