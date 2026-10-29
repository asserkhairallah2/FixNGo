using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixNGo.Infrastructure.Persistence.Configurations;

public class ServiceCenterConfiguration : IEntityTypeConfiguration<ServiceCenter>
{
    public void Configure(EntityTypeBuilder<ServiceCenter> builder)
    {
        builder.ToTable("ServiceCenters");

        builder.HasKey(sc => sc.Id);

        builder.Property(sc => sc.Name)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(sc => sc.NameEn)
            .HasMaxLength(150);

        builder.Property(sc => sc.Phone)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(sc => sc.Address)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(sc => sc.Latitude)
            .HasPrecision(9, 6)
            .IsRequired();

        builder.Property(sc => sc.Longitude)
            .HasPrecision(9, 6)
            .IsRequired();

        builder.Property(sc => sc.Rating)
            .HasPrecision(3, 2)
            .HasDefaultValue(0.00m);

        builder.Property(sc => sc.VerificationStatus)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(sc => sc.IsActive)
            .HasDefaultValue(false);

        builder.Property(sc => sc.PasswordHash)
            .HasMaxLength(256);

        builder.Property(sc => sc.CommercialRegister)
            .HasMaxLength(50);

        builder.Property(sc => sc.UserId)
            .HasMaxLength(450);

        // Relationships
        builder.HasOne(sc => sc.User)
            .WithMany()
            .HasForeignKey(sc => sc.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(sc => sc.Services)
            .WithOne(s => s.ServiceCenter)
            .HasForeignKey(s => s.ServiceCenterId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(sc => sc.WorkingHours)
            .WithOne(wh => wh.ServiceCenter)
            .HasForeignKey(wh => wh.ServiceCenterId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(sc => sc.Bookings)
            .WithOne(b => b.ServiceCenter)
            .HasForeignKey(b => b.ServiceCenterId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes for performance and spatial search
        builder.HasIndex(sc => new { sc.Latitude, sc.Longitude })
            .HasDatabaseName("IX_ServiceCenters_Latitude_Longitude");

        builder.HasIndex(sc => new { sc.IsActive, sc.VerificationStatus })
            .HasDatabaseName("IX_ServiceCenters_IsActive_VerificationStatus");

        builder.HasIndex(sc => sc.Phone)
            .HasDatabaseName("IX_ServiceCenters_Phone");
    }
}

