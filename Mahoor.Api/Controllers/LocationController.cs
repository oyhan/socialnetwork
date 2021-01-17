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
using Microsoft.AspNetCore.Mvc;
using PSYCO.Common.BaseModels;

namespace Mahoor.Api.Controllers
{
    public class LocationController:BaseApiController
    {
        private readonly IAppRepository<CityModel, Guid> _cityRepository;

        public LocationController(IAppRepository<CityModel,Guid> cityRepository)
        {
            _cityRepository = cityRepository;
        }
        [HttpGet("/location/current/{lat}/{lon}")]
        public async Task<ActionResult<List<CityDto>>> GetCurrentCity(double lat , double lon)
        {
            var command = new GetCityByLatLongCommand(lat, lon);

            var result =await  Mediator.Send(command);

            if (result.SuccessFull)
            {
                return Ok(result);

            }

            return BadRequest(result);

        }

        [HttpGet]
        public async Task<ActionResult> Citys()
        {

         

            var citys = await _cityRepository.ListAsync(c => new
            {
                Geom = c.Geom.ToText(),
                c.City,

            },new GetAllCitiesQuery());
            return Ok(citys);
        }




      
    }
}
