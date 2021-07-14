using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Place.Dto
{
    public class PlaceSearchDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsCity { get; set; }
        public string Province { get; set; }
    }
}
