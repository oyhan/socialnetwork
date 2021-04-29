using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Request
{
   public class LocationBasedRequest:BaseRequest
    {
        public LocationBasedRequest(double lat , double lon)
        {
            Location = new Point(lon, lat);
        }
        public Geometry Location { get; }
    }
}
