using ChefCode.Common.Repository;
using Mahoor.DomainObjects.Place;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mahoor.Data.Queries.Place
{
    public class RestaurantGetByLocationIdsQuery : BaseSpecification<RestaurantModel,Guid>
    {
        public RestaurantGetByLocationIdsQuery(List<Guid> includedIds,Geometry userLocation,int from , int to)
        {
            AddCriteria(c => includedIds.Contains(c.Id));
            ApplyOrderByDescending(x => x.Rate);
            AddInclude(r => r.Reviews);
            ApplyOrderBy(x => x.Location.Distance(userLocation));
            ApplyPaging(from, to);
        }
    }
}
