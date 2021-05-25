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

namespace Mahoor.Services.City.Handlers
{
    public class GetCityByLatLongCommandHandler :IRequestHandler<GetCityByLatLongCommand 
        , BaseServiceResponse<CityHomeDto>>
    {
        private readonly IAppRepository<CityModel, Guid> _cityRepository;
        private readonly IAppRepository<PostModel, Guid> _postRepository;

        public GetCityByLatLongCommandHandler(IAppRepository<CityModel, Guid> cityRepository, IAppRepository<PostModel, Guid> postRepository)
        {
            _cityRepository = cityRepository;
            _postRepository = postRepository;
        }
        public async  Task<BaseServiceResponse<CityHomeDto>> Handle(GetCityByLatLongCommand request, CancellationToken cancellationToken)
        {
            var citys = (await _cityRepository.ListAsync(city =>  new CityHomeDto()
            {
                Id = city.Id,
                Name = $"{city.City},{city.Province}",
                PhotosCount = city.Posts.Count()
            },
                new GetCurrentCityQuery(request.Lat, request.Lon, request.From, request.To))).ToList();
            var city = citys.FirstOrDefault();
            var lastPost =await _postRepository.ListAsync(new GetLastPostsOfCityQuery(city.Id,0,1));
            var lastPhoto = lastPost.FirstOrDefault().Medias.First().Path;
            city.LastPhoto = lastPhoto;
           
            return BaseServiceResponse<CityHomeDto>.SuccessFullResponse(citys.FirstOrDefault());
        }
    }
}
