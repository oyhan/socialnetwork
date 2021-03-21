using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Mahoor.Api.ViewModels
{
    public class ProfileEditViewModel
    {
        public string UserName { get; set; }
        public string Bio { get; set; }
        public string Website { get; set; }
        public Guid CityId { get; set; }
        public string Favorites { get; set; }
        public IFormFileCollection Files { get; set; }
        public string DisplayName { get; set; }

    }
}
