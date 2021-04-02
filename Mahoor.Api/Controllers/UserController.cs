using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChefCode.Common.WebFamework;
using Mahoor.Api.Controllers;
using Mahoor.Services.Helper;
using Mahoor.Services.Response;
using Mahoor.Services.Timeline.Dtos;
using Mahoor.Services.User;
using Mahoor.Services.User.Commands;
using Mahoor.Services.User.Follower.Dto;
using MediatR;

namespace Mahoor.Api.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        private AppUserManager _userService;
        private readonly IHttpContextAccessor _accessor;
        private readonly IMediator _mediator;

        public UserController(AppUserManager userService,IHttpContextAccessor accessor,IMediator mediator)
        {
            _userService = userService;
            _accessor = accessor;
            _mediator = mediator;
            _userService.IpAddress = ipAddress();
            
        }



        

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Register(RegisterUserCommand command)
        {
            var result = await _userService.Register(command);
            if (result.SuccessFull)
            {
                return Ok(result.Response);

            }

            return BadRequest(result.Message);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult> UsernameAvailable(string username)
        {
            var result = await _userService.FindByUsername(username);
            if (result==null)
            {
                return Ok();
            }
            
            return BadRequest();
        }


        [HttpPost("{mobileNumber}/{token}")]
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmPhoneNumber([FromRoute]ConfirmPhoneNumberCommand command)
        {
            var result = await _userService.ConfirmPhoneNumber(command);
            if (result.SuccessFull)
            {
                return Ok(result.Response);

            }

            return BadRequest(result.Message);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult > Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model, ipAddress());

            if (!response.SuccessFull)
                return BadRequest(new { message = response.Message });

            setTokenCookie(response.Response.RefreshToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = _userService.RefreshToken(refreshToken, ipAddress());

            if (response == null)
                return StatusCode(401,new { message = "Invalid token" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("{mobileNumber}")]
        public async Task<IActionResult> Login(string mobileNumber)
        {
            var response =await _userService.FindByPhoneNumberAsync(mobileNumber);

            if (response == null)
                return StatusCode(400, new { message = "invalid mobile number" });
            var otp = await _userService.UserManager.GenerateChangePhoneNumberTokenAsync(response, response.PhoneNumber);
            //todo send otp

            return Ok();
        }




        [HttpPost("revoke-token")]
        public IActionResult RevokeToken([FromBody] RevokeTokenRequest model)
        {
            // accept token from request body or cookie
            var token = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is required" });

            var response = _userService.RevokeToken(token, ipAddress());

            if (!response)
                return NotFound(new { message = "Token not found" });

            return Ok(new { message = "Token revoked" });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var user = _userService.GetById(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpGet("{id}/refresh-tokens")]
        public IActionResult GetRefreshTokens(Guid id)
        {
            var user = _userService.GetById(id);
            if (user == null) return NotFound();

            return Ok(user.RefreshTokens);
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> Follow(string username)
        {
            var cmd = new FollowUserCommand(Guid.Parse(User.Id()), username);
            var result = await _mediator.Send(cmd);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> UnFollow(string username)
        {
            var cmd = new UnFollowUserCommand(Guid.Parse(User.Id()), username);
            var result = await _mediator.Send(cmd);
            if (result.Response)
            {
                return Ok();
            }

            return BadRequest(result);
        }
        /// <summary>
        /// Lists list of usernames followers
        /// </summary>
        /// <param name="username">username to list it's followers</param>
        /// <returns></returns>
        [HttpGet("/{username}/followers")]
        public async Task<ActionResult<BaseServiceResponse<List<FollowerItemDto>>>> Followers(string username)
        {
            var command = new GetUserFollowersCommand(username);

            var result =await _mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        /// <summary>
        /// Lists users followings by username
        /// </summary>
        /// <param name="username">username to list it's followings</param>
        /// <returns></returns>
        [HttpGet("/{username}/followings")]
        public async Task<ActionResult<BaseServiceResponse<List<FollowerItemDto>>>> Followings(string username)
        {
            var command = new GetUserFollowingsCommand(username);

            var result = await _mediator.Send(command);
            if (result.SuccessFull)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }



        // helper methods

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress()
        {
            if (_accessor.HttpContext.Request.Headers.ContainsKey("X-Forwarded-For"))
                return _accessor.HttpContext.Request.Headers["X-Forwarded-For"];
            else
                return _accessor.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }




    }
}