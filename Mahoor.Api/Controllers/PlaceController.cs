using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elasticsearch.Net.Specification.IndexLifecycleManagementApi;
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Commands;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Timeline.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Mahoor.Api.Controllers
{
    public class PlaceController :BaseApiController
    {


        [HttpPost("/place/fave/{placeId}")]
        public async Task<ActionResult<PlaceRateDto>> AddToFavorite(Guid placeId)
        {
            var command = new PlaceAddToFavoriteCommand(User.Id(),placeId);

            var result = await Mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        [HttpPost("/place/unfave/{placeId}")]
        public async Task<ActionResult<PlaceRateDto>> RemoveFromFavorite(Guid placeId)
        {
            var command = new PlaceRemoveFromFavoriteCommand(User.Id(), placeId);

            var result = await Mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("/place/photos/{placeId}/{from=0}/{to=10}")]
        public async Task<ActionResult<PlaceRateDto>> GetPlacePhotos(Guid placeId,int from , int to )
        {
            var command = new PlaceGetPhotosCommand(placeId,from , to);

            var result = await Mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("/place/rate/{placeId}")]
        public async Task<ActionResult<PlaceRateDto>> GetRestaurantRateSeparately(Guid placeId)
        {
            var command = new GetRestaurantRateSeparatelyCommand(placeId);

            var result = await Mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

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

        [HttpGet]
        public async Task<ActionResult> Favorites()
        {
            var command = new GetFavoritesByUserIdCommand(User.IdGuid());

            var result = await Mediator.Send(command);

            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
