using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.User
{
   public class UserDto
    {
        public string DisplayName { get; set; }
        public string City { get; set; }
        public string Bio { get; set; }
        public DateTime BirthDay { get; set; }
        public string UserName { get; set; }
        public string Favorites { get; set; }
        public string Website { get; set; }
        public Guid? CityId { get; internal set; }
    }
}
