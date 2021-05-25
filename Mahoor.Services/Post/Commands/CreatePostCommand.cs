using System;
using System.Collections.Generic;
using Mahoor.Services.Dtos;
using Mahoor.Services.Response;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Mahoor.Services.Post.Commands
{
    public class CreatePostCommand :  IRequest<BaseServiceResponse<Guid>>
    {
        public string UserId { get; set; }
        public string Text { get; set; }
        public IReadOnlyList<MediaDto> Medias{ get; set; }
        public Guid? PlaceId { get; set; }
        public Guid? CityId { get; set; }
    }
}
