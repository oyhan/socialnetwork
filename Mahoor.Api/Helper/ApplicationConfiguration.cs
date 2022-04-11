using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Reflection;
using System.Text;
using CacheManager.Core;
using ChefCode.Common.WebFamework.Helper;
using EFCoreSecondLevelCacheInterceptor;
using Hangfire;
using Hangfire.SqlServer;
using Mahoor.Data;
using Mahoor.DomainObjects.User;
using Mahoor.Infrastructure;
using Mahoor.Services.Graph;
using Mahoor.Services.Graph.Events;
using Mahoor.Services.Place;
using Mahoor.Services.Post;
using Mahoor.Services.Redis;
using Mahoor.Services.Timeline;
using Mahoor.Services.User;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;

using NetTopologySuite;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Newtonsoft.Json;
using NpgsqlTypes;
using PSYCO.Common.Interfaces;
using PSYCO.Infrastructure.Communications.Services.Sms.Ozeki;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.MSSqlServer;
using Serilog.Sinks.PostgreSQL;
using ConfigurationBuilder = Microsoft.Extensions.Configuration.ConfigurationBuilder;
using Mahoor.Services.Helper;

namespace Mahoor.Api.Helper
{
    public static class ApplicationConfigurations
    {




        public static void WireUpSerilog()
        {
            Serilog.Debugging.SelfLog.Enable(msg => Debug.WriteLine(msg));
            IDictionary<string, ColumnWriterBase> columnWriters = new Dictionary<string, ColumnWriterBase>
            {
                {"message", new RenderedMessageColumnWriter(NpgsqlDbType.Text) },
                {"message_template", new MessageTemplateColumnWriter(NpgsqlDbType.Text) },
                {"level", new LevelColumnWriter(true, NpgsqlDbType.Varchar) },
                {"raise_date", new TimestampColumnWriter(NpgsqlDbType.Timestamp) },
                {"exception", new ExceptionColumnWriter(NpgsqlDbType.Text) },
                {"properties", new LogEventSerializedColumnWriter(NpgsqlDbType.Jsonb) },
                {"props_test", new PropertiesColumnWriter(NpgsqlDbType.Jsonb) },
                {"machine_name", new SinglePropertyColumnWriter("MachineName", PropertyWriteMethod.ToString, NpgsqlDbType.Text, "l") }
            };


            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                //.WriteTo.Console()
                .WriteTo.PostgreSQL(
                    connectionString: config.GetConnectionString("LogDatabase"),
                    needAutoCreateTable: true,
                    tableName: "Logs", period: TimeSpan.FromSeconds(5),
                    columnOptions: columnWriters
                )
                .CreateLogger();

        }


        public static void CongfigureApp(this IServiceCollection services, IConfiguration Configuration)
        {
           

            var serviceProvider = services.BuildServiceProvider(); 

            var appSettings = serviceProvider.GetService<IOptionsSnapshot<AppSettings>>().Value;

            Console.WriteLine("somelog");
            Console.WriteLine("redis {0}",appSettings.RedisUrl);
            Console.WriteLine("connectoin string {0}", Configuration.GetConnectionString("PostgreSQL"));
            
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(appSettings.RedisUrl);

            services.AddSingleton<IDatabase>(redis.GetDatabase());
            //            services.AddStackExchangeRedisCache(o =>
            //            {
            //                o.ConfigurationOptions
            //            });

            services.AddScoped(typeof(IAppRepository<,>), typeof(AppRepository<,>));
            services.AddTransient<IGraphService, GraphService>();
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<ILocationService, LocationService>();
            services.AddTransient(typeof(AppUserManager));



            //<--------------caching configurations----------------->

            #region enable caching   


//            const string providerName1 = "Redis1";
//            services.AddEFSecondLevelCache(options =>
//                options.UseEasyCachingCoreProvider(providerName1, isHybridCache: false).DisableLogging(true)
//                    .CacheAllQueries(CacheExpirationMode.Absolute, TimeSpan.FromMinutes(30))
//
//
//            );

//            services.AddEasyCaching(option =>
//            {
//                option.UseRedis(config =>
//                {
//
//                    config.DBConfig.AllowAdmin = true;
//                    config.DBConfig.Endpoints.Add(new EasyCaching.Core.Configurations.ServerEndPoint("127.0.0.1", 6379));
//                }, providerName1);
//            });


            #endregion
            services.AddDbContext<AppDbContext>(
                (sp, opt) =>

                {

                    //                    opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
                    //                        ,
                    //                        x => x.UseNetTopologySuite());
                    opt.UseSqlServer(Configuration.GetConnectionString("PostgreSQL")
                        ,
                        op =>
                        {
                            op.MigrationsAssembly("Mahoor.Data");
                            op.UseNetTopologySuite();
                        });
//                        .AddInterceptors(sp.GetRequiredService<SecondLevelCacheInterceptor>()
//                             );
                });
            //            services.AddSignalR();
            services.AddIdentity<UserModel, IdentityRole>(o =>
                {
                    o.Password = new PasswordOptions()
                    {
                        RequireDigit = false,
                        RequireLowercase = false,
                        RequireNonAlphanumeric = false,
                        RequireUppercase = false,
                    };
                    o.SignIn.RequireConfirmedPhoneNumber = true;


                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders().
                AddErrorDescriber<LocalizedIdentityErrorDescriber>().

                AddUserManager<UserManager<UserModel>>();
            services.AddHttpContextAccessor();

            services.AddMediatR(typeof(IUserService));

            services.AddSingleton(typeof(IInMemoryRepository<>), typeof(RedisRepository<>));

            services.AddTransient<IPlaceService, PlaceService>();
            services.AddTransient<ITimelineService, TimelineService>();
            services.AddTransient<IRedisService, RedisService>();





            //configure api bihavior
            services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});


            //add swagger

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mahoor Social Media web api", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });




            //config app repository
            services.AddScoped(typeof(IAppRepository<,>), typeof(AppRepository<,>));

            //            services.AddScoped<ISmsSender, >>();
            //            services.AddScoped<IEmailSender, EmailService<EmailSettings>>();



            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims

            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;

                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            //using Hangfire
//            var hangfireOptions = new SqlServerStorageOptions
//            {
//                PrepareSchemaIfNecessary = true
//            };
//
//            services.AddHangfire(x => x.UseSqlServerStorage(Configuration.GetConnectionString("DefaultConnection"), hangfireOptions));
//            services.AddHangfireServer();
        }

        public static void EnsureLastMigrationApplyed<TDbContext>(this IApplicationBuilder app) where TDbContext : DbContext
        {
            //ensure last migration applyed.
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<TDbContext>();
                context.Database.Migrate();
            }

        }
        public static void UseAppConfigs(this IApplicationBuilder app)
        {
            //            app.UseWebSockets();
            //            app.UseDotNetify();
            app.UseAuthentication();

            app.UseSwagger();

            //             Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            //             specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });



            //            app.UseAuthentication();

            //Hangfire Dashboard
//            app.UseHangfireDashboard(options: new DashboardOptions()
//            {
//                Authorization = null
//            });
//            app.UseHangfireServer(new BackgroundJobServerOptions()
//            {
//                WorkerCount = 1,
//
//            });
        }
    }
}
