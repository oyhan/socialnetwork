using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.Data.Queries.Timeline;
using Mahoor.DomainObjects.Place;
using Mahoor.Services.Helper;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Commands;
using Mahoor.Services.Timeline.Dtos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.IO;
using OsmSharp.Geo;
//using OsmSharp.Geo;
using OsmSharp.Streams;

namespace Mahoor.Api.Controllers
{
    [Authorize]
    public class TimelineController : BaseApiController
    {
        private readonly IMediator _mediator;
        private readonly AppDbContext _db;

        public TimelineController(IMediator mediator,AppDbContext db)
        {
            _mediator = mediator;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<BaseServiceResponse<TimelineDto>>> Get(double lat , double lon)
        {
            var cmd = new GetUserTimelineCommand(Guid.Parse(User.Id()),lat , lon);
            var result = await _mediator.Send(cmd);

            if (result.SuccessFull)
            {
                return Ok(result.Response);

            }

            return BadRequest(result);
        }

        [HttpGet("{username}/{from}/{to}")]
        public async Task<ActionResult> GetUserTimelinePosts(string username, int from, int to)
        {
            var cmd = new ListUserTimelinePostsCommand(username, User.Id(), from, to);
            var result = await Mediator.Send(cmd);
            if (result.SuccessFull)
            {
                return Ok(result.Response);
            }

            return BadRequest(result);
        }


        [HttpGet]
        public async Task<ActionResult> Insert()
        {
            var rows = AddGeoData.AddYazdRestaurants(_db);
            
            return Ok(rows);
        }



#if DEBUG
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Citys()
        {

            return Ok(AddGeoData.InsertCitys(_db));

            //            var citys = await _cityRepository.ListAsync(c => new
            //            {
            //                Geom = c.Geom.ToText(),
            //                c.City,
            //
            //            },new GetAllCitiesQuery());
            //            return Ok(citys);
        }
#endif


    }
}
