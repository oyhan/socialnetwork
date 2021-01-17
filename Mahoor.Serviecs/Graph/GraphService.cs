using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mahoor.Services.Graph;
using Mahoor.SocialGraph;

namespace Mahoor.Services.Graph
{
    public  class GraphService : IGraphService
    {
        public Task AddObject(ObjectModel obj)
        {
            throw new NotImplementedException();
        }

        public Task RemoveObject(Guid objectId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateObject(ObjectModel obj)
        {
            throw new NotImplementedException();
        }

        public Task AddAssociation(Guid id1, Guid id2, AType aType)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAssociation(Guid id1, Guid id, AType aType)
        {
            throw new NotImplementedException();
        }

        public Task<List<Guid>> GetAssociation(Guid id, AType aType)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetAssociationCount(Guid id, AType aType)
        {
            throw new NotImplementedException();
        }
    }
}
