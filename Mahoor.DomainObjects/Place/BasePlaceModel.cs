using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Text.Json;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.Review;
using NetTopologySuite.Geometries;
using Newtonsoft.Json.Serialization;
using Point = NetTopologySuite.Geometries.Point;

namespace Mahoor.DomainObjects.Place
{
    public class BasePlaceModel : BaseModel<Guid>
    {
        public string EnglishName { get; set; }
//        public PlaceType Type { get; set; }
        public Geometry Location{ get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public float Rate { get; set; }
       
        [Column(TypeName = "jsonb")]
        public JsonDocument Attributes { get; set; }
        public List<ReviewModel> Reviews { get; set; }
        public ICollection<Media> Medias { get; set; }

        public string this[string attrName] => Attributes.RootElement.EnumerateObject().Any(c=>c.Name==attrName)? Attributes.RootElement.GetProperty(attrName).GetString() : "";

    }

    public enum PlaceType
    {
        Restaurant,

    }

    public class PlaceAttributeModel : List<PlaceAttributeItem>
    {
        public bool ContainsKey(string key)
        {
            return this.Any(i => i.Key == key);
        }

        public string this[string key]
        {
            get { return this.FirstOrDefault(i => i.Key == key)?.Value; }

            set => this.Add(new PlaceAttributeItem{Key = key,Value = value});
        }

    }

    public class PlaceAttributeItem
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }

}
