using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Text;
using ChefCode.Common.BaseModels;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Post;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mahoor.DomainObjects.User
{
   


    public class UserModel : IdentityUser
    {
        public string DisplayName  { get; set; }
        public CityModel City { get; set; }
        public Guid? CityId { get; set; }
        public string Bio { get; set; }
        public string CurrentCity { get; set; }
        public string Favorites { get; set; }
        public string Website { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; }
        public DateTime BirthDay { get; set; }
        public List<PostModel> Posts { get; set; }
        public string AvatarUrl { get; set; }

    }

    [Owned]
    public class RefreshToken :BaseModel<Guid>
    {
       
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime Created { get; set; }
        public string CreatedByIp { get; set; }
        public DateTime? Revoked { get; set; }
        public string RevokedByIp { get; set; }
        public string ReplacedByToken { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;
    }
}
