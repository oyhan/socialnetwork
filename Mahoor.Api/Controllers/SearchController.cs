//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Net.Mail;
//using System.Threading.Tasks;
//using Mahoor.Data;
//using Mahoor.Data.Queries.City;
//using Mahoor.DomainObjects.City;
//using Mahoor.Services.City.Commands;
//using Mahoor.Services.City.Dto;
//using Mahoor.Services.Helper;
//using Microsoft.AspNetCore.Mvc;
//using PSYCO.Common.BaseModels;

//namespace Mahoor.Api.Controllers
//{
//    public class SearchController:BaseApiController
//    {
//        private readonly IAppRepository<CityModel, Guid> _cityRepository;

//        public SearchController(IAppRepository<CityModel,Guid> cityRepository)
//        {
//            _cityRepository = cityRepository;
//        }
//        [HttpGet("/location/current/{lat}/{lon}")]
//        public async Task<ActionResult<List<CityDto>>> GetCurrentCity(double lat , double lon)
//        {
//            var command = new SearchBoboCommand(lat, lon);

//            var result =await  Mediator.Send(command);

//            if (result.SuccessFull)
//            {
//                return Ok(result);

//            }

//            return BadRequest(result);

//        }

//        [HttpGet("{name}")]
//        public async Task<ActionResult> Citys(string name)
//        {
//            var citys = await _cityRepository.ListAsync(c => new
//            {
//                c.Id,
//                c.City,
//                c.Province

//            },new GetAllCitiesQuery(name));
//            citys = citys.Where(c => c.City.Contains(name) || c.Province.Contains(name)).ToList();
//            return Ok(citys);
//        }
//    }
//}
