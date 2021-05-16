using Autofac;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OData.Edm;
using Newtonsoft.Json.Serialization;
using ODataVeterinary.Data;
using ODataVeterinary.Domain;
using ODataVeterinary.Domain.Abstract;
using ODataVeterinary.Infraestructure;
using ODataVeterinary.Infraestructure.Abstract;
using ODataVeterinary.Shared.Model;
using System;

namespace ODataVeterinary
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOData();
            services.AddODataQueryFilter();
            services.AddDbContext<ODataVeterinaryDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));            
            services.AddControllers(options => options.EnableEndpointRouting = false).AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
            services.AddCors(c =>
            {
                c.AddPolicy(MyAllowSpecificOrigins, options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {                        
            builder.RegisterType<PetDomain>().As<IPetDomain>();
            builder.RegisterType<PetRepository>().As<IPetRepository>();
            builder.RegisterType<ODataVeterinaryDbContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var serviceProvider = serviceScope.ServiceProvider;
                serviceProvider.GetService<ODataVeterinaryDbContext>().Database.EnsureCreated();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseMvc(routeBuilder =>
            {                
                routeBuilder.EnableDependencyInjection();
                routeBuilder.Select().Filter().OrderBy().Expand().Count(Microsoft.AspNet.OData.Query.QueryOptionSetting.Allowed).MaxTop(10);
                routeBuilder.MapODataServiceRoute("ODataRoute", "odata", GetEdmModel(app.ApplicationServices));
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        private static IEdmModel GetEdmModel(IServiceProvider serviceProvider)
        {
            var builder = new ODataConventionModelBuilder(serviceProvider);

            builder.EntitySet<Pet>("Pet")
                    .EntityType
                    .Filter()
                    .Count()
                    .Expand()
                    .OrderBy()
                    .Page()
                    .Select();

            return builder.GetEdmModel();
        }
    }
}
