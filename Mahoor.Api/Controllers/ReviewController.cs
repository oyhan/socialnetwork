using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Elasticsearch.Net.Specification.IndexLifecycleManagementApi;
using Mahoor.Api.ViewModels;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Helper;
using Mahoor.Services.Place.Dto;
using Mahoor.Services.Response;
using Mahoor.Services.Review.Commands;
using Mahoor.Services.Review.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Mahoor.Api.Controllers
{
    public class ReviewController : BaseApiController
    {



        [HttpPost("/review/{placeId}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<BaseServiceResponse<Guid>>> New(Guid placeId , [FromForm] ReviewViewModel review)
        {



            var medias = ProcessFiles();
            var dto = new ReviewDto()
            {
                Medias = medias,
                PlaceId = placeId,
                Rate = review.Rate,
                DateVisited = review.DateVisited,
                Description = review.Description,
                Title = review.Title
            };

            var cmd = new CreateReviewCommand()
            {
              
               Requester = User.Id(),
               Dto = dto
            };

            var result = await Mediator.Send(cmd);
            if (result.SuccessFull)
             {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("/review/search/{restaurantId}/{text}")]
        public async Task<ActionResult<BaseServiceResponse<List<RestaurantReviewItemDto>>>> Search(string? text , Guid restaurantId)
        {
            var cmd = new SearchRestaurantReviewsCommand( restaurantId , text);

            var result = await Mediator.Send(cmd);

            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

      


    }
}
