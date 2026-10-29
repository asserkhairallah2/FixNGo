using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixNGo.Infrastructure.Persistence.Configurations;

public class ProviderProfileConfiguration : IEntityTypeConfiguration<ProviderProfile>
{
    public void Configure(EntityTypeBuilder<ProviderProfile> builder)
    {
        builder.ToTable("ProviderProfiles");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.UserId)
            .IsRequired()
            .HasMaxLength(450);

        builder.Property(p => p.PrimaryServiceType)
            .HasConversion<string>()
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(p => p.VerificationStatus)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(p => p.Rating)
            .HasPrecision(3, 2)
            .HasDefaultValue(5.00m);

        builder.Property(p => p.NationalId)
            .HasMaxLength(50);

        builder.Property(p => p.DriverLicenseNumber)
            .HasMaxLength(50);

        builder.Property(p => p.VehiclePlateNumber)
            .HasMaxLength(50);

        builder.Property(p => p.City)
            .HasMaxLength(150);

        builder.Property(p => p.Bio)
            .HasMaxLength(500);

        // One-to-one relationship with ApplicationUser
        builder.HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(p => p.UserId)
            .IsUnique()
            .HasDatabaseName("IX_ProviderProfiles_UserId");

        builder.HasIndex(p => new { p.IsOnline, p.VerificationStatus })
            .HasDatabaseName("IX_ProviderProfiles_IsOnline_VerificationStatus");
    }
}
