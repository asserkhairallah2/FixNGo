using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixNGo.Infrastructure.Persistence.Configurations;

public class WorkingHoursConfiguration : IEntityTypeConfiguration<WorkingHours>
{
    public void Configure(EntityTypeBuilder<WorkingHours> builder)
    {
        builder.ToTable("WorkingHours");

        builder.HasKey(wh => wh.Id);

        builder.Property(wh => wh.DayOfWeek)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(wh => wh.OpenTime)
            .HasColumnType("time")
            .IsRequired();

        builder.Property(wh => wh.CloseTime)
            .HasColumnType("time")
            .IsRequired();

        builder.Property(wh => wh.IsClosed)
            .HasDefaultValue(false);

        // Relationships
        builder.HasOne(wh => wh.ServiceCenter)
            .WithMany(sc => sc.WorkingHours)
            .HasForeignKey(wh => wh.ServiceCenterId)
            .OnDelete(DeleteBehavior.Cascade);

        // Unique constraint: A service center can have at most one schedule definition per day of week
        builder.HasIndex(wh => new { wh.ServiceCenterId, wh.DayOfWeek })
            .IsUnique()
            .HasDatabaseName("IX_WorkingHours_ServiceCenterId_DayOfWeek_Unique");
    }
}

