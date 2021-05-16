using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ODataVeterinary.Shared.Model;

namespace ODataVeterinary.Data.Config
{
    public class OwnerConfiguration : IEntityTypeConfiguration<Owner>
    {
        public void Configure(EntityTypeBuilder<Owner> builder)
        {
            builder
                .Property(o => o.ID)
                .ValueGeneratedOnAdd();

            builder
                .Property(o => o.Name)
                .IsRequired();

            builder
                .Property(o => o.LastName)
                .IsRequired();

            builder
                .Property(o => o.PhoneNumber)
                .HasMaxLength(9)
                .IsRequired();
        }
    }
}
