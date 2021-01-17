using System;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.City;
using NetTopologySuite.Geometries;

namespace Mahoor.Data.Queries.City
{
    public sealed class GetCurrentCityQuery : BaseSpecification<CityModel, Guid> 
    {
        public GetCurrentCityQuery(in double requestLat, in double requestLon, in int requestFrom, in int requestTo)
        {
            var location = new Point(  requestLon , requestLat);
            AddCriteria(c=>c.Geom.Covers(location));
            ApplyPaging(requestFrom,requestTo);
        }
    }
}
