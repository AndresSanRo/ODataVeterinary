using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ODataVeterinary.Shared.Model;

namespace ODataVeterinary.Data.Config
{
    public class PetConfiguration : IEntityTypeConfiguration<Pet>
    {
        public void Configure(EntityTypeBuilder<Pet> builder)
        {
            builder
                .Property(p => p.ID)
                .ValueGeneratedOnAdd();

            builder
                .Property(p => p.Name)
                .IsRequired();
            
            builder
                .Property(p => p.Species)                
                .IsRequired();

            builder
                .HasMany(p => p.Owners)
                .WithOne(o => o.Pet);                
        }
    }
}
