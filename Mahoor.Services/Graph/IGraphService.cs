using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mahoor.DomainObjects.SocialGraph;

namespace Mahoor.Services.Graph
{
    public interface IGraphService
    {
        Task<bool> HasAssociation(Guid id1, Guid id2, AType aType);
        Task AddObject(ObjectModel model);
        Task RemoveObject(Guid objectId);
        Task UpdateObject(ObjectModel model);
        Task AddAssociation(Guid id1, Guid id2, AType aType, object data);
        Task AddAssociation(Guid id1, Guid id2, AType aType);
        Task DeleteAssociation(Guid id1, Guid id, AType aType);
        /// <summary>
        /// Returns all associations that an object was on beginning side .
        /// for example all posts(ids) a user liked. user id is the id and like is the association
        /// </summary>
        /// <param name="id">Id of the Object</param>
        /// <param name="aType">Association type</param>
        /// <returns></returns>
        Task<List<Guid>> GetAssociationsFrom(Guid id, AType aType);
        /// <summary>
        /// opposite to GetAssociationFrom method
        /// </summary>
        /// <param name="id"></param>
        /// <param name="aType"></param>
        /// <returns></returns>
        Task<List<Guid>> GetAssociationsTo(Guid id, AType aType);

        Task<int> GetAssociationCountFrom(Guid id, AType aType);
        Task<int> GetAssociationCountTo(Guid id, AType aType);

    }
}
