using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.Post;
using NetTopologySuite.Geometries;

namespace Mahoor.DomainObjects.City
{
   public class CityModel :BaseModel<Guid>
    {
        public string City { get; set; }
        public string Province { get; set; }
        public Geometry Geom { get; set; }
        public List<PostModel> Posts { get; set; }
        public DistrictType Type { get; set; }
        public bool IsDeleted { get; set; }

    }

   public enum DistrictType
   {
       City,
       Province
   }
}
