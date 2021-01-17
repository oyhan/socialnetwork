using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ChefCode.Common.Repository;
using Mahoor.Data;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.Services.ExtentionMethods;
using Mahoor.Services.Graph;
using Serilog;
using StackExchange.Redis;

namespace Mahoor.Services.Graph
{
    public  class GraphService : IGraphService
    {
        private readonly IAppRepository<ObjectModel, Guid> _objectRepository;
        private readonly IAppRepository<AssociationModel, Guid> _associationRepository;

        public GraphService(
            IAppRepository<ObjectModel, Guid> objectRepository,
            IAppRepository<AssociationModel, Guid> associationRepository
            )
        {
            _objectRepository = objectRepository;
            _associationRepository = associationRepository;
        }

        public async Task<bool> HasAssociation(Guid id1, Guid id2, AType aType)
        {
             return (await _associationRepository.
                        Where(o => o.Id1 == id1 && o.Id2 == id2 && o.AssociationType == aType))
                    .FirstOrDefault()!=null;
        }

        public async Task AddObject(ObjectModel model)
        {
            await _objectRepository.AddAsync(model);

        }

       
        public async Task RemoveObject(Guid objectId)
        {
            await _objectRepository.DeleteByIdAsync(objectId);
        }

        public async Task UpdateObject(ObjectModel obj)
        {
            await _objectRepository.UpdateAsync(obj);
        }

        public async Task AddAssociation(Guid id1, Guid id2, AType aType,object data)
        {
            try
            {
                //at the time being we don't have duplicate association with the same keys 
                if (await HasAssociation(id1 , id2 , aType))
                {
                    return;
                }
                var association = new AssociationModel()
                {
                    Id1 = id1,
                    Id2 = id2,
                    AssociationType = aType,
                    Data = data.ToJsonDocument()
                };
                await _associationRepository.AddAsync(association);
            }
            catch (Exception e)
            {
                Log.Logger.Fatal("exception in saving the post event in the graph with error {error}: " , e.ToString());
                throw e;
            }
        }

        public async Task AddAssociation(Guid id1, Guid id2, AType aType)
        {
            await AddAssociation(id1, id2, aType, null);
        }

        public async Task DeleteAssociation(Guid id1, Guid id2, AType aType)
        {
          var asso = (await _associationRepository.Where(
              a => a.Id1 == id1 && a.Id2 == id2 && a.AssociationType == aType)).SingleOrDefault();
          await _associationRepository.DeleteAsync(asso);
        }

        public async Task<List<Guid>> GetAssociationsFrom(Guid id, AType aType)
        {
           return (await _associationRepository.Where(a => a.Id1 == id && a.AssociationType == aType)).Select(s => s.Id2).ToList();
        }

        public async Task<List<Guid>> GetAssociationsTo(Guid id, AType aType)
        {
            return (await _associationRepository.Where(a => a.Id2 == id && a.AssociationType == aType)).Select(s => s.Id1).ToList();

        }

        public async Task<int> GetAssociationCountFrom(Guid id, AType aType)
        {
            return (await _associationRepository.CountAsync(new GenericSpec<AssociationModel, Guid>(
                a => a.Id1 == id && a.AssociationType == aType)));

        }

        public async Task<int> GetAssociationCountTo(Guid id, AType aType)
        {
            return (await _associationRepository.CountAsync(new GenericSpec<AssociationModel, Guid>(
                a => a.Id1 == id && a.AssociationType == aType)));
        }
    }
}
