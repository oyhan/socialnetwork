using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Timeline.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Mahoor.Api.Controllers
{
    public class PlaceController :BaseApiController
    {




        [HttpGet("/restaurant/{id}/{lat}/{lon}")]
        public async Task<ActionResult<RestaurantDetailDto>> RestaurantDetail(Guid id, double lat , double lon)
        {
            var command = new GetRestaurantDetailedCommand(id,lat , lon);

            var result = await Mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        [HttpGet("/place/search/{name}")]
        public async Task<ActionResult<PlaceSearchDto>> Search(string name)
        {
            var command = new SearchPlaceCommand(name);

            var result = await Mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

    }
}
