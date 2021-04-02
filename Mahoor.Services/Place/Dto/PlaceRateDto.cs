using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;

namespace Mahoor.Services.Place.Dto
{
    public class PlaceRateDto
    {
        public int Excellent { get; set; }
        public int VeryGood { get; set; }
        public int Normal { get; set; }
        public int Weak { get; set; }
        public int Horrible { get; set; }
        
    }
}
