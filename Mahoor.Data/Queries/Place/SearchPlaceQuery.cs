using System;
using ChefCode.Common.Repository;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Place;
using NetTopologySuite.Geometries;

namespace Mahoor.Data.Queries.Place
{
    public sealed class SearchPlaceQuery : BaseSpecification<BasePlaceModel, Guid> 
    {
        public SearchPlaceQuery(string nameTerm)
        {
            var termReady = nameTerm.ToLower();
            AddCriteria(c=>c.Name.ToLower().Contains(termReady) || c.EnglishName.ToLower().Contains(termReady));
        }
    }
}
