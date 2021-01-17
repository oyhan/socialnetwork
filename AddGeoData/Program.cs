using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Mahoor.Data;
using Mahoor.DomainObjects.Place;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using NetTopologySuite.IO;
using OsmSharp.Geo;
using OsmSharp.Streams;

namespace AddGeoData
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var fileStream = File.OpenRead(@"C:\Users\Ali\Downloads\yazd.pbf"))
            {
                var source = new PBFOsmStreamSource(fileStream); // create source stream.
                var filtered = from osmGeo in source
                    where
                        (osmGeo.Tags != null && osmGeo.Tags.Contains("amenity", "restaurant"))
                    select osmGeo;
                var resturaunt = filtered.ToFeatureSource();
                var yazdRestaurants = new List<RestaurantModel>();

                foreach (var osmGeo in resturaunt)
                {
                    yazdRestaurants.Add((new RestaurantModel()
                    {
                        Name = osmGeo.Attributes["name"].ToString(),
                        Location = new WKBReader().Read(osmGeo.Geometry.AsBinary()),
                        CreatedDate = DateTime.Now,
                        Id = Guid.NewGuid()

                    }));

                }

                
            }
        }
    }
}
