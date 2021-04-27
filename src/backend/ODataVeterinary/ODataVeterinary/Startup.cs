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
using ODataVeterinary.Data;
using ODataVeterinary.Domain;
using ODataVeterinary.Domain.Abstract;
using ODataVeterinary.Infraestructure;
using ODataVeterinary.Infraestructure.Abstract;
using ODataVeterinary.Shared.Model;

namespace ODataVeterinary
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
            services.AddOData();
            services.AddODataQueryFilter();
            services.AddDbContext<ODataVeterinaryDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers(options => options.EnableEndpointRouting = false);
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

            app.UseAuthorization();

            app.UseMvc(routeBuilder =>
            {
                routeBuilder.Select().Filter();
                routeBuilder.EnableDependencyInjection();
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        private IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

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
