using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using Mahoor.Services.User.Profile.Dto;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class GetUserProfileByUsernameCommand : IRequest<BaseServiceResponse<ProfileDto>>
    {
        public string UserName { get; }


        public GetUserProfileByUsernameCommand(string username)
        {
            UserName = username;
        }
    }
}
