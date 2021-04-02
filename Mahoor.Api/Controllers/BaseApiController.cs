using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ChefCode.Common.WebFamework;
using Mahoor.DomainObjects.Post;
using Mahoor.Services.Dtos;
using Mahoor.Services.Response;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mahoor.Api.Controllers
{
    public class BaseApiController : BaseController
    {

        public string HostUrl => $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
        protected IMediator Mediator => (IMediator) HttpContext.RequestServices.GetService(typeof(IMediator));

        protected ActionResult<BaseServiceResponse<T>> BadRequestApiResult<T>(string errorMessage)
        {
            return BadRequest(BaseServiceResponse<T>.FailedResponse(errorMessage));
            
        }

        internal IReadOnlyList<MediaDto> ProcessFiles()
        {


            var files = Request.Form.Files;
            if (files == null)
            {
                return null;
            }
            var medias = new List<MediaDto>();
            foreach (IFormFile file in files)
            {
                if (file == null || file.Length == 0)
                {
                   continue;
                }
                

                var media = new MediaDto()
                {
                    MimeType = file.ContentType,
                    Name = file.FileName,
                    Size = file.Length,
                    File =  file
                    
                };
                medias.Add(media);



              
            }

            return medias;
        }
    }
}
