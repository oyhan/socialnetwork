using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ChefCode.Common.WebFamework;
using Mahoor.Api.ViewModels;
using Mahoor.Services.City.Commands;
using Mahoor.Services.City.Dto;
using Mahoor.Services.Helper;
using Mahoor.Services.Like.Command;
using Mahoor.Services.Post;
using Mahoor.Services.Post.Commands;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline;
using Mahoor.Services.Timeline.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace Mahoor.Api.Controllers
{
    [Authorize]
    public class PostController : BaseApiController
    {
        //        private IPostService _postService;
        private readonly IMediator _mediator;
        //        private readonly IDatabase _redis;

        public PostController(
            IMediator mediator
            )
        {
            //            _postService = postService;
            _mediator = mediator;
            //            _redis = redis;
            //            redis.StringSet("asd", "dqwdqwdqd");
        }



        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> New([FromForm] PostViewModel post)
        {
            var medias = ProcessFiles();
            if (medias == null || medias.Count == 0)
            {
                return BadRequest("you have to select atleast one photo");
            }

            var cmd = new CreatePostCommand()
            {
                Text = post.Text,
                UserId = User.Id(),
                PlaceId = post.PlaceId,
                Medias = medias,
                CityId = post.CityId

            };

            var result = await _mediator.Send<BaseServiceResponse<Guid>>(cmd);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(EditPostCommand command)
        {

            var result = await _mediator.Send<BaseServiceResponse<bool>>(command);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetPostById(Guid postId)
        {
            var cmd = new GetPostByIdCommand()
            {
                PostId = postId
            };
            var result = await _mediator.Send(cmd);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        [HttpPost("/post/delete/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var command = new DeletePostCommand() { PostId = id ,Requester= User.IdGuid()};
            var result = await _mediator.Send<BaseServiceResponse<bool>>(command);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }
        /// <summary>
        /// like a post
        /// </summary>
        /// <param name="postId">the id of the post</param>
        /// <returns></returns>
        [HttpPost("/like/{id}")]
        public async Task<ActionResult> Like(Guid id)
        {
            var cmd = new NewLikePostCommand(Guid.Parse(User.Id()), id);
            var result = await _mediator.Send(cmd);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }
        /// <summary>
        /// remove a like from a post
        /// </summary>
        /// <param name="id">post id</param>
        /// <returns></returns>
        [HttpPost("/unlike/{id}")]
        public async Task<ActionResult> UnLike(Guid id)
        {
            var cmd = new NewUnLikePostCommand(Guid.Parse(User.Id()), id);

            var result = await _mediator.Send(cmd);

            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }


        /// <summary>
        /// report a post
        /// </summary>
        /// <param name="postId">the id of the post</param>
        /// <returns></returns>
        [HttpPost("/post/report/{id}")]
        public async Task<ActionResult> Report(Guid id)
        {
            var cmd = new PostReportCommand(User.Id(), id);
            var result = await _mediator.Send(cmd);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }
        
        [HttpGet("/city/posts/{cityId}")]
        [AllowAnonymous]
        public async Task<ActionResult<BaseServiceResponse<List<CityPostListDto>>>> GetCityPosts(Guid cityId)
        {
            var cmd = new GetCityPostsCommand(0,50,cityId);
           
            var result = await _mediator.Send(cmd);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


    }
}
