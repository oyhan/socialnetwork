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
           return geom.Distance(geom2).ToMetric();
        }
    }
}
