using System;
using System.Collections.Generic;
using System.Text;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.SocialGraph;
using MediatR;

namespace Mahoor.Services.Graph.Events
{
    public class ObjectCreatedEvent<TObject> :INotification
    {
        public ObjectCreatedEvent()
        {
            
        }
        public ObjectCreatedEvent(OType type,TObject obj,Guid objectId)
        {
            Type = type;
            Object = obj;
            ObjectId = objectId;
        }
        public TObject  Object { get; set; }
        public Guid ObjectId { get; }
        public OType Type { get; }
    }
}
