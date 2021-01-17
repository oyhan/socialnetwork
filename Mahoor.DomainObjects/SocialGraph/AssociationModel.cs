using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using ChefCode.Common.BaseModels;

namespace Mahoor.DomainObjects.SocialGraph
{
   public class AssociationModel : BaseModel<Guid>
    {
        public Guid Id1 { get; set; }
        public Guid Id2 { get; set; }
        public AType AssociationType { get; set; }

        [Column(TypeName = "jsonb")]
        public JsonDocument Data { get; set; }

    }

    [Flags]
    public enum AType 
    {
        Likes = 2 ,      //user->post
        Authored= 4,     //user->post
        Rated = 8,       //user->place
        Comment = 16,     //not available
        Following =32,    //user->user
        FollowRequest =64, //user->user
        Blocked =128,      //user->user
        Reported=256,      // user-> user,post
        Wrote=512          //user-> review 
    }
}
