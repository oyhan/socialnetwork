using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using ChefCode.Common.BaseModels;

namespace Mahoor.DomainObjects.SocialGraph
{
  public  class ObjectModel:BaseModel<Guid>
    {
        public ObjectModel()
        {
            
        }
        public ObjectModel(Guid objectId, OType oType,JsonDocument data)
        {
            ObjectId = objectId;
            Type = oType;
            Data = data;
        }
        public Guid ObjectId { get; set; }
        public OType Type { get; set; }
        public JsonDocument Data { get; set; }
    }


    public enum OType :byte
    {
        Post,
        Place,
        User,
    }
}
