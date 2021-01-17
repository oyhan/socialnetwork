using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Services.Dtos;
using Microsoft.AspNetCore.Http;

namespace Mahoor.Api.ViewModels
{
    public class ReviewViewModel
    {
        public int Rate { get; set; }
        public string Title { get; set; }
        //        [MinLength(100)]
        public string Description { get; set; }
        public DateTime DateVisited { get; set; }

        public IFormFileCollection Files { get; set; }
        public Guid PlaceId { get; set; }
    }
}
