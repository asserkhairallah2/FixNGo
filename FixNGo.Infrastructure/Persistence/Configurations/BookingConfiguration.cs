using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixNGo.Infrastructure.Persistence.Configurations;

public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("Bookings");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.CustomerId)
            .IsRequired()
            .HasMaxLength(450);

        builder.Property(b => b.AppointmentDate)
            .HasColumnType("date")
            .IsRequired();

        builder.Property(b => b.AppointmentTime)
            .HasColumnType("time")
            .IsRequired();

        builder.Property(b => b.Status)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(b => b.Price)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(b => b.Notes)
            .HasMaxLength(500);

        builder.Property(b => b.RejectionReason)
            .HasMaxLength(500);

        builder.Property(b => b.CancellationReason)
            .HasMaxLength(500);

        // Relationships (Restrict delete to preserve booking history and financial transactions)
        builder.HasOne(b => b.ServiceCenter)
            .WithMany(sc => sc.Bookings)
            .HasForeignKey(b => b.ServiceCenterId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(b => b.Service)
            .WithMany(s => s.Bookings)
            .HasForeignKey(b => b.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(b => b.Customer)
            .WithMany()
            .HasForeignKey(b => b.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(b => new { b.ServiceCenterId, b.AppointmentDate, b.AppointmentTime })
            .HasDatabaseName("IX_Bookings_ServiceCenterId_AppointmentDate_Time");

        builder.HasIndex(b => new { b.CustomerId, b.Status })
            .HasDatabaseName("IX_Bookings_CustomerId_Status");

        builder.HasIndex(b => b.Status)
            .HasDatabaseName("IX_Bookings_Status");
    }
}

