using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixNGo.Infrastructure.Persistence.Configurations;

public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.ToTable("Services");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(s => s.NameEn)
            .HasMaxLength(150);

        builder.Property(s => s.Description)
            .HasMaxLength(1000);

        builder.Property(s => s.Price)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(s => s.EstimatedDurationMinutes)
            .HasDefaultValue(60);

        builder.Property(s => s.IsActive)
            .HasDefaultValue(true);

        // Relationships
        builder.HasOne(s => s.ServiceCenter)
            .WithMany(sc => sc.Services)
            .HasForeignKey(s => s.ServiceCenterId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(s => s.Bookings)
            .WithOne(b => b.Service)
            .HasForeignKey(b => b.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(s => new { s.ServiceCenterId, s.IsActive })
            .HasDatabaseName("IX_Services_ServiceCenterId_IsActive");
    }
}

