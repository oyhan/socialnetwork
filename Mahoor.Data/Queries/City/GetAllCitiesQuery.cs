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
        public GetAllCitiesQuery(string name)
        {
            name = name.ToLower();
//            AddCriteria(c=>c.Geom.OgcGeometryType!=OgcGeometryType.Point);
            AddCriteria(c=>c.City.ToLower().Contains(name)|| c.Province.ToLower().Contains(name));
//            ApplyPaging(0,10);
        }
    }
}
