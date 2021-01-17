using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.SocialGraph;

namespace Mahoor.Services.Graph
{
    public interface IGraphService
    {

        Task AddObject(ObjectModel obj);
        Task RemoveObject(Guid objectId);
        Task UpdateObject(ObjectModel obj);
        Task AddAssociation(Guid id1, Guid id2, AType aType);
        Task DeleteAssociation(Guid id1, Guid id, AType aType);
        Task<List<Guid>> GetAssociation(Guid id, AType aType);

        Task<int> GetAssociationCount(Guid id, AType aType);

    }
}
