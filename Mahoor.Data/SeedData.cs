using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.User;
using Mahoor.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace Mahoor.Data
{
    public static class SeedData
    {

        public async static void SeedIdentity(this ModelBuilder modelBuilder)
        {


            // any guid
            const string ADMIN_ID = "a18be9c0-aa65-4af8-bd17-00bd9344e575";
            // any guid, but nothing is against to use the same one
            const string ROLE_ID = ADMIN_ID;
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = ROLE_ID,
                Name = AppConstants.ADMIN,
                NormalizedName = AppConstants.ADMIN.ToUpper()
            });

            var hasher = new PasswordHasher<UserModel>();
            modelBuilder.Entity<UserModel>().HasData(new UserModel
            {
                Id = ADMIN_ID,
                UserName = "Admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@mahoor.com",
                NormalizedEmail = "ADMIN@MAHOOR.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Mahoor123@465"),
                SecurityStamp = string.Empty
            });

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = ROLE_ID,
                UserId = ADMIN_ID
            });


//            AddGeoData.AddYazdRestaurantWithModelbuilder(modelBuilder);
//            AddGeoData.InsertCitys(modelBuilder);


        }
    }
}
