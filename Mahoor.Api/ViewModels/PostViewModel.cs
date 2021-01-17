using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Services.Dtos;
using Microsoft.AspNetCore.Http;

namespace Mahoor.Api.ViewModels
{
    public class PostViewModel
    {
        public string Text { get; set; }
  
        public IFormFileCollection Files { get; set; }
        public Guid PlaceId { get; set; }
    }
}
