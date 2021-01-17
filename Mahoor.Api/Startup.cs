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

namespace Mahoor.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection(
                nameof(AppSettings)));
            //                .AddNewtonsoftJson(s=>s.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.CongfigureApp(Configuration); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAppConfigs();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseAuthorization();
            app.EnsureLastMigrationApplyed<AppDbContext>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
