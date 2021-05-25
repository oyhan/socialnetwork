using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Api.ViewModels;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Helper;
using Mahoor.Services.Response;
using Mahoor.Services.Search.Commands;
using Mahoor.Services.Search.Dto;
using Mahoor.Services.Timeline.Commands;
using Mahoor.Services.User;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Dto;
using Mahoor.Services.User.Profile.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mahoor.Api.Controllers
{
    [Authorize]
    public class ProfileController:BaseApiController
    {
        private readonly AppUserManager _userManager;


        public ProfileController(AppUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("{query}")]
        public async Task<ActionResult<BaseServiceResponse<SearchBoboDto>>> Search(string query)
        {
            var command = new SearchBoboCommand(query,User.Id());
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<BaseServiceResponse<ProfileDto>>> Get(string username)
        {
            var user  = await _userManager.FindByUsername(username);
            if (user == null)
            {
                return BadRequestApiResult<ProfileDto>("invalid username");
            }
            var command = new GetUserProfileCommand(Guid.Parse(user.Id),User.Id());

            var result = await Mediator.Send(command);

            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);

        }

        [HttpGet]
        public async Task<ActionResult<BaseServiceResponse<ProfileDto>>>  Me()
        {
            var command = new GetUserProfileCommand(Guid.Parse(User.Id()),User.Id());

            var result = await Mediator.Send(command);

            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);

        }

        [HttpGet("{username}/{from}/{to}")]
        public async Task<ActionResult> GetUserTimelinePosts(string username,int from, int to)
        {
            var cmd = new ListUserTimelinePostsCommand(username, User.Id(),from, to);
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
                UserId = User.Id(),
                DisplayName = profile.DisplayName

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
