using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.City;
using Mahoor.DomainObjects.City;
using Mahoor.Services.City.Commands;
using Mahoor.Services.City.Dto;
using Mahoor.Services.Helper;
using Microsoft.AspNetCore.Mvc;
using PSYCO.Common.BaseModels;

namespace Mahoor.Api.Controllers
{
    public class LocationController:BaseApiController
    {
        private readonly IAppRepository<CityModel, Guid> _cityRepository;
        private readonly ILocationService _locationService;

        public LocationController(IAppRepository<CityModel,Guid> cityRepository,ILocationService locationService)
        {
            _cityRepository = cityRepository;
            _locationService = locationService;
        }
        [HttpGet("/location/current/{lat}/{lon}")]
        public async Task<ActionResult<CityDto>> GetCurrentCity(double lat , double lon)
        {
            var command = new GetCityByLatLongCommand(lat, lon);

            var result =await  Mediator.Send(command);

            if (result.SuccessFull)
            {
                return Ok(result);

            }

            return BadRequest(result);

        }

        [HttpGet("{name}")]
        public async Task<ActionResult> Citys(string name)
        {
            var citys = await _cityRepository.ListAsync(c => new
            {
                c.Id,
                c.City,
                c.Province,
            },new GetAllCitiesQuery(name));
           
            return Ok(citys);
        }

        [HttpGet("/city/{name}")]
        public async Task<ActionResult> GetCityHomeData(string name)
        {
            var citys = await _cityRepository.ListAsync(c => new
            {
                c.Id,
                c.City,
                c.Province,
                c.Posts,
                c.Geom,
                PhotosCount = c.Posts.Count()
            }, new GetAllCitiesQuery(name));
            var result = citys.Select(c => new CityHomeDto()
            {
                Id = c.Id,
                LastPhoto = c.Posts?.OrderByDescending(p => p.CreatedDate)?.FirstOrDefault()?.Medias?.First()?.Path,
                Name = $"{c.City},{c.Province}",
                PhotosCount = c.PhotosCount,
                City = c.City,
                Province = c.Province,
                DistanceToUser = c.Geom.GetDistance(_locationService.RequesterLocation)
            });
            return Ok(result);
        }
    }
}
