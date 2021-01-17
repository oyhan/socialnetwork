using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Data;
using Mahoor.DomainObjects.Place;
using Mahoor.Services.Follow.Command;
using Mahoor.Services.Helper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.IO;
using OsmSharp.Geo;
//using OsmSharp.Geo;
using OsmSharp.Streams;

namespace Mahoor.Api.Controllers
{
#if !DEBUG
    [Authorize]
#endif
    public class FollowerController : BaseApiController
    {
        private readonly IMediator _mediator;
        private readonly AppDbContext _db;

        public FollowerController(IMediator mediator,AppDbContext db)
        {
            _mediator = mediator;
            _db = db;
        }
        /// <summary>
        /// accept a follow request
        /// </summary>
        /// <param name="userid">The userId who wants to follow me</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Accept(Guid userid)
        {
            var cmd = new AcceptFollowRequestCommand(Guid.Parse(User.Id()),userid);
            var result = await _mediator.Send(cmd);

            if (result.SuccessFull)
            {
                return Ok(result.Response);

            }

            return BadRequest(result);
        }

    


    }
}
