using System;
using System.Collections.Generic;
using Mahoor.Services.Dtos;
using Mahoor.Services.Response;
using MediatR;

namespace Mahoor.Services.User.Commands
{
    public class EditProfileCommand :  IRequest<BaseServiceResponse<bool>>
    {
        public string DisplayName { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Bio { get; set; }
        public string Website { get; set; }
        public Guid CityId { get; set; }
        public string Favorites { get; set; }
        public IReadOnlyList<MediaDto> Medias{ get; set; }
       
    }
}
