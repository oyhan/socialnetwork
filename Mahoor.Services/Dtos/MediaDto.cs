using System;
using System.Collections.Generic;
using System.Security.AccessControl;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Mahoor.Services.Dtos
{
    public class MediaDto
    {
        public string Name { get; set; }
        public string MimeType { get; set; }
        public long Size { get; set; }
        public IFormFile File { get; set; }
        public string Path { get; set; }
    }
}
