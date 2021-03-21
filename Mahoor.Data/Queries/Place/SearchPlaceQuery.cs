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
           
            AddCriteria(c=>c.Name.ToLower().Contains(nameTerm) || c.EnglishName.ToLower().Contains(nameTerm));
        }
    }
}
