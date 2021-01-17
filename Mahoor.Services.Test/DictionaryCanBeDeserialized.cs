using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using Xunit;

namespace Mahoor.Services.Test
{
    public class DictionarySerializationTest
    {
        [Fact]
        public void DicationaryCanBeDeserialized()
        {
            var str = @"
[
    {
        ""Key"": ""amenity"",
            ""Value"": ""fast_food""
        },
        {
            ""Key"": ""name"",
            ""Value"": ""نوژ""
        }
        ]";


            var dictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(str);


        }


        [Fact]
        public void DicationaryCanBeSerialized()
        {
          var dict = new Dictionary<string, string>(){{"asd", "asd"} ,{"ali","good"}};


          var dictionary = JsonSerializer.Serialize(dict);


        }
    }
}
