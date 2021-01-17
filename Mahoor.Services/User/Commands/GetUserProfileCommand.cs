using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.Services.Response;
using Mahoor.Services.User.Profile.Dto;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class GetUserProfileCommand :IRequest<BaseServiceResponse<ProfileDto>>
    {
        public Guid UserId { get; }


        public GetUserProfileCommand(Guid userId)
        {
            UserId = userId;
        }
    }
}
