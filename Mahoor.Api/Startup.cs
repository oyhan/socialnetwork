using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mahoor.Api.Helper;
using Mahoor.Data;
using Mahoor.Infrastructure;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;

namespace Mahoor.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public AppSettings Settings { get; set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddDefaultPolicy(c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().Build()));
            services.AddControllers()
                .AddNewtonsoftJson(s => s.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection(
                nameof(AppSettings)));
            services.CongfigureApp(Configuration);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptionsSnapshot<AppSettings> options)
        {
            Settings = options.Value;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.Use(async (context, next) =>
            //{
            //    await next.Invoke();
            //    //handle response
            //    //you may also need to check the request path to check whether it requests image
            //    if (context.Response.StatusCode == 404 && context.Request.Path.Value.Contains("avatar.webp"))
            //    {
            //        context.Response.Redirect("/defaultAv.png"); //path in wwwroot for default image
            //    }
            //});

            app.UseStaticFiles();
            app.UseAppConfigs();
            app.UseCors();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        
            app.UseSpa(spa =>
            {
                spa.UseProxyToSpaDevelopmentServer(Settings.UiUrl);
            });
            app.EnsureLastMigrationApplyed<AppDbContext>();

        }
    }
}
