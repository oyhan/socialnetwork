using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Api.ViewModels;
using Mahoor.Services.Helper;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Commands;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Profile.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Mahoor.Api.Controllers
{
    public class ProfileController:BaseApiController
    {







        [HttpGet]
        public async Task<ActionResult<BaseServiceResponse<ProfileDto>>>  Me()
        {
            var command = new GetUserProfileCommand(Guid.Parse(User.Id()));

            var result = await Mediator.Send(command);

            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);

        }

        [HttpGet]
        public async Task<ActionResult> GetUserTimelinePosts(string userId,int from, int to)
        {
            var cmd = new ListUserTimelinePostsCommand(userId, from, to);
            var result = await Mediator.Send(cmd);
            if (result.SuccessFull)
            {
                return Ok(result.Response);
            }

            return BadRequest(result);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> Edit([FromForm] ProfileEditViewModel profile)
        {


            var medias = ProcessFiles();

            var cmd = new EditProfileCommand()
            {
                Bio = profile.Bio,
                CityId= profile.CityId,
                UserName= profile.UserName,
                Medias = medias,
                Website = profile.Website,
                Favorites = profile.Favorites,
                UserId = User.Id()

            };

            var result = await Mediator.Send(cmd);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        /// <summary>
        /// report a profile
        /// </summary>
        /// <param name="id">the id of the profile</param>
        /// <returns></returns>
        [HttpPost("/profile/report/{id}")]
        public async Task<ActionResult> Report(Guid id)
        {
            var cmd = new ProfileReportCommand(User.Id(), id);
            var result = await Mediator.Send(cmd);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }


        /// <summary>
        /// block a profile
        /// </summary>
        /// <param name="id">the id of the profile</param>
        /// <returns></returns>
        [HttpPost("/profile/block/{id}")]
        public async Task<ActionResult> Block(Guid id)
        {
            var cmd = new ProfileBlockCommand(User.Id(), id);
            var result = await Mediator.Send(cmd);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }
    }
}
