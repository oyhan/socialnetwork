using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Place;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using OsmSharp;
using OsmSharp.Geo;
using OsmSharp.Streams;

namespace Mahoor.Data
{
    public static class AddGeoData
    {

        public static async Task<int> AddYazdRestaurants(AppDbContext context)
        {




            await context.Places.AddRangeAsync(ExtractRestaurants());
            return await context.SaveChangesAsync();

        }


        public static void AddYazdRestaurantWithModelbuilder(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RestaurantModel>().HasData(ExtractRestaurants());
        }


        public static List<RestaurantModel> ExtractRestaurants()
        {
            using (var fileStream = File.OpenRead(@"C:\Users\Ali\Downloads\my_export_yazd.osm.pbf"))
            {
                var source = new PBFOsmStreamSource(fileStream); // create source stream.
                var filtered = from osmGeo in source
                               where
                                   (osmGeo.Tags != null
                                    && osmGeo.Type == OsmGeoType.Node && osmGeo.Tags.ContainsKey("amenity") &&
                                    (osmGeo.Tags.ContainsKey("name") || osmGeo.Tags.ContainsKey("name:en")))
                               select osmGeo;
                //                var resturaunt = filtered.ToFeatureSource();
                var yazdRestaurants = new List<RestaurantModel>();

                foreach (var osmGeo in filtered.Cast<OsmSharp.Node>())
                {
                    var dict = osmGeo.Tags.ToDictionary(s => s.Key, v => v.Value);
                    yazdRestaurants.Add((new RestaurantModel()
                    {
                        Name = osmGeo.Tags.ContainsKey("name") ? osmGeo.Tags.GetValue("name") :
                            osmGeo.Tags.ContainsKey("name:en") ? osmGeo.Tags.GetValue("name:en") : "no name",

                        Location = new Point(osmGeo.Longitude.Value, osmGeo.Latitude.Value),
                        CreatedDate = DateTime.Now,
                        Id = Guid.NewGuid(),
                        Attributes = JsonDocument.Parse(System.Text.Json.JsonSerializer.Serialize(dict))

                    }));

                }

                return yazdRestaurants;
            }

        }



        public static int InsertCitys(AppDbContext context)
        {
            var josnData = File.ReadAllText(@"C:\Users\Ali\Downloads\Shahrestan.json");

            // create NetTopology JSON reader
            var reader = new NetTopologySuite.IO.GeoJsonReader();
            FeatureCollection featureCollection;
            var serializer = GeoJsonSerializer.Create();
            using (var stringReader = new StringReader(josnData))
            using (var jsonReader = new JsonTextReader(stringReader))
            {
                featureCollection = serializer.Deserialize<FeatureCollection>(jsonReader);
                var citys = new List<CityModel>();

                foreach (var feature in featureCollection)
                {
                    var citymodel = new CityModel()
                    {

                        Id = Guid.NewGuid(),
                        City = feature.Attributes["NAME_2"].ToString(),
                        Province = feature.Attributes["NAME_1"].ToString(),
                        Geom = feature.Geometry,
                        Type = DistrictType.City,
                        CreatedDate = DateTime.Now,
                        LastModifiedDate = DateTime.Now
                    };
                    citys.Add(citymodel);

                }

                context.Citys.AddRange(citys);
                return context.SaveChanges();
            }

            return 0;
            // pass geoJson's FeatureCollection to read all the features
            //            var featureCollection = reader.Read<GeoJSON.Net.Feature.FeatureCollection>(josnData);
            //             
            //            // if feature collection is null then return 
            //             if (featureCollection == null)
            //            {
            //                return 0;
            //            }
            //
            //             foreach (var feature in featureCollection.Features)
            //             {
            //                 var citymodel = new CityModel()
            //                 {
            //
            //                     Id = Guid.NewGuid(),
            //                     City = feature.Properties["NAME_2"].ToString(),
            //                     Province = feature.Properties["NAME_1"].ToString(),
            //                     Geom =  feature.Geometry.,
            //                     Type = DistrictType.City,
            //                     CreatedDate = DateTime.Now,
            //                     LastModifiedDate = DateTime.Now
            //                 };
            //                 citys.Add(citymodel);
            //
            //             }
            //
            //             context.Citys.AddRange(citys);
            //            return context.SaveChanges();

        }
        public static int InsertCitys(ModelBuilder modelBuilder)
        {
            var josnData = File.ReadAllText(@"C:\Users\Ali\Downloads\Shahrestan.json");

            // create NetTopology JSON reader
            var reader = new NetTopologySuite.IO.GeoJsonReader();
            FeatureCollection featureCollection;
            var serializer = GeoJsonSerializer.Create();
            using (var stringReader = new StringReader(josnData))
            using (var jsonReader = new JsonTextReader(stringReader))
            {
                featureCollection = serializer.Deserialize<FeatureCollection>(jsonReader);
                var citys = new List<CityModel>();

                foreach (var feature in featureCollection)
                {
                    var citymodel = new CityModel()
                    {

                        Id = Guid.NewGuid(),
                        City = feature.Attributes["NAME_2"].ToString(),
                        Province = feature.Attributes["NAME_1"].ToString(),
                        Geom = feature.Geometry,
                        Type = DistrictType.City,
                        CreatedDate = DateTime.Now,
                        LastModifiedDate = DateTime.Now
                    };
                    citys.Add(citymodel);

                }

                modelBuilder.Entity<CityModel>()
                    .HasData(citys);
//                context.Citys.AddRange(citys);
//                return context.SaveChanges();
            }

            return 0;
            // pass geoJson's FeatureCollection to read all the features
            //            var featureCollection = reader.Read<GeoJSON.Net.Feature.FeatureCollection>(josnData);
            //             
            //            // if feature collection is null then return 
            //             if (featureCollection == null)
            //            {
            //                return 0;
            //            }
            //
            //             foreach (var feature in featureCollection.Features)
            //             {
            //                 var citymodel = new CityModel()
            //                 {
            //
            //                     Id = Guid.NewGuid(),
            //                     City = feature.Properties["NAME_2"].ToString(),
            //                     Province = feature.Properties["NAME_1"].ToString(),
            //                     Geom =  feature.Geometry.,
            //                     Type = DistrictType.City,
            //                     CreatedDate = DateTime.Now,
            //                     LastModifiedDate = DateTime.Now
            //                 };
            //                 citys.Add(citymodel);
            //
            //             }
            //
            //             context.Citys.AddRange(citys);
            //            return context.SaveChanges();

        }

    }
}
