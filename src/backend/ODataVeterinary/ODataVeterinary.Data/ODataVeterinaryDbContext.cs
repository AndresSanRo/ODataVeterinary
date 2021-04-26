using Microsoft.EntityFrameworkCore;
using ODataVeterinary.Data.Config;
using ODataVeterinary.Shared.Model;

namespace ODataVeterinary.Data
{
    public class ODataVeterinaryDbContext : DbContext
    {
        public DbSet<Pet> Pet { get; set; }

        public DbSet<Owner> Owner { get; set; }

        public ODataVeterinaryDbContext(DbContextOptions<ODataVeterinaryDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PetConfiguration());
            modelBuilder.ApplyConfiguration(new OwnerConfiguration());
        }
    }
}
