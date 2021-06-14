using Microsoft.AspNetCore.Http;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Services.Helper
{
    public interface ILocationService
    {
        public Geometry RequesterLocation { get; }
    }

    public class LocationService : ILocationService
    {
        private HttpContext _httpContext;

        public LocationService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }
        public Geometry RequesterLocation
        {
            get
            {
                var latitudeStr = _httpContext.Request.Headers["Latitude"].ToString();
                var longitudeStr = _httpContext.Request.Headers["Longitude"].ToString();
                var x = double.Parse(longitudeStr);
                var y = double.Parse(latitudeStr);
                return new Point(x, y){SRID = 4326};
            }
        }
    }
}
