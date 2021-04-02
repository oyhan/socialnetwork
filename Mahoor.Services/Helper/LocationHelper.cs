using System;
using System.Collections.Generic;
using System.Text;
using Humanizer;
using NetTopologySuite.Geometries;

namespace Mahoor.Services.Helper
{
   public static class LocationHelper
    {
        public static string GetDistance(this Geometry geom, Geometry geom2)
        {
           var distance = geom.Distance(geom2);
          var humanizedDistance =  distance > 1000 ? $"{(distance / 1000):F2} کیلومتر" : $"{distance:F0} متر";
          return humanizedDistance;
        }
    }
}
