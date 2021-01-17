    using System;
using System.Collections.Generic;
using System.Text;
using Mahoor.DomainObjects.City;
using Mahoor.DomainObjects.Place;
using Mahoor.DomainObjects.Post;
using Mahoor.DomainObjects.Review;
using Mahoor.DomainObjects.SocialGraph;
using Mahoor.DomainObjects.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mahoor.Data
{
   public class AppDbContext : IdentityDbContext<UserModel>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

      
        protected override void OnModelCreating(ModelBuilder builder)
        {
//            builder.SeedIdentity();

            builder.HasPostgresExtension("postgis");
            builder.HasPostgresExtension("pgroonga");


            builder.Entity<ReviewModel>().OwnsMany<Media>(o => o.Medias);
            builder.Entity<BasePlaceModel>().Property(p => p.Location).HasColumnType("geography");
            builder.Entity<CityModel>().Property(p => p.Geom).HasColumnType("geometry");
            builder.Entity<BasePlaceModel>(c => c.HasIndex(d => d.Location));
            builder.Entity<CityModel>(c => c.HasIndex(d => d.Geom).HasMethod("GIST"));
            builder.Entity<UserModel>().Property(c => c.Bio).HasMaxLength(160);
            builder.Entity<UserModel>().Property(c => c.CurrentCity).HasMaxLength(160);
            builder.Entity<UserModel>().Property(c => c.DisplayName).HasMaxLength(160);
            builder.Entity<RestaurantModel>().HasBaseType(typeof(BasePlaceModel));
            
                builder.Entity<ReviewModel>()
                    .HasIndex(p=>p.Description)
                    .HasMethod("pgroonga")
                    .HasOperators("pgroonga_varchar_full_text_search_ops_v2");

                builder.Entity<ReviewModel>()
                    .HasIndex(p => p.Title)
                    .HasMethod("pgroonga")
                    .HasOperators("pgroonga_varchar_full_text_search_ops_v2");

            builder.Entity<PostModel>().Property(c => c.Text).HasMaxLength(1000);

            builder.Entity<PostModel>()
                .HasIndex(p=>p.Text)
                .HasMethod("pgroonga")
                .HasOperators("pgroonga_varchar_full_text_search_ops_v2");


            base.OnModelCreating(builder);
        }


        public DbSet<PostModel> Posts { get; set; }
        public DbSet<BasePlaceModel> Places { get; set; }
        public DbSet<RestaurantModel> Restaurants { get; set; }
        public DbSet<CityModel> Citys { get; set; }
        public DbSet<ReviewModel> Reviews{ get; set; }
        
       



        #region GraphSchema
        public DbSet<ObjectModel> Objects { set; get; }
        public DbSet<AssociationModel> Associations { set; get; }
        #endregion


    }



   
}
