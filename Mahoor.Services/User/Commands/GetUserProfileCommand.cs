using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Infrastructure;
using Mahoor.Services.Response;
using Mahoor.Services.User.Profile.Dto;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class GetUserProfileCommand :IRequest<BaseServiceResponse<ProfileDto>>,IAppBaseRequest
    {
        public Guid UserId { get; }


        public GetUserProfileCommand(Guid userId,string requester)
        {
            UserId = userId;
            Requester = requester;
        }

        public string Requester { get; set; }
    }
}
