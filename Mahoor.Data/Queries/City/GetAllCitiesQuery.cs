using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.City;
using NetTopologySuite.Geometries;

namespace Mahoor.Data.Queries.City
{
    public sealed class GetAllCitiesQuery :BaseSpecification<CityModel,Guid>
    {
        public GetAllCitiesQuery()
        {
            AddCriteria(c=>c.Geom.OgcGeometryType!=OgcGeometryType.Point);
//            ApplyPaging(0,10);
        }
    }
}
