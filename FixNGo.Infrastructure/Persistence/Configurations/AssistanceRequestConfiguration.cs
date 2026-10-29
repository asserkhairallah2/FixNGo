using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FixNGo.Infrastructure.Persistence.Configurations;

public class AssistanceRequestConfiguration : IEntityTypeConfiguration<AssistanceRequest>
{
    public void Configure(EntityTypeBuilder<AssistanceRequest> builder)
    {
        builder.ToTable("AssistanceRequests");

        builder.HasKey(ar => ar.Id);

        builder.Property(ar => ar.CustomerId)
            .IsRequired()
            .HasMaxLength(450);

        builder.Property(ar => ar.CustomerName)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(ar => ar.CustomerPhone)
            .IsRequired()
            .HasMaxLength(25);

        builder.Property(ar => ar.ProviderId)
            .HasMaxLength(450);

        builder.Property(ar => ar.ServiceType)
            .HasConversion<string>()
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(ar => ar.ProblemDescription)
            .HasMaxLength(1000);

        builder.Property(ar => ar.Status)
            .HasConversion<string>()
            .HasMaxLength(25)
            .IsRequired();

        builder.Property(ar => ar.CustomerAddress)
            .HasMaxLength(300);

        builder.Property(ar => ar.VehicleInfo)
            .HasMaxLength(150);

        builder.Property(ar => ar.VehiclePlateNumber)
            .HasMaxLength(50);

        builder.Property(ar => ar.EstimatedFare)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(ar => ar.FinalFare)
            .HasPrecision(18, 2);

        builder.Property(ar => ar.RejectionReason)
            .HasMaxLength(500);

        builder.Property(ar => ar.CancellationReason)
            .HasMaxLength(500);

        builder.Property(ar => ar.ReviewText)
            .HasMaxLength(1000);

        builder.Property(ar => ar.PaymentMethod)
            .HasMaxLength(50);

        // Concurrency token for optimistic locking (protects against concurrent provider acceptance)
        builder.Property(ar => ar.RowVersion)
            .IsRowVersion();

        // Foreign key relationships
        builder.HasOne(ar => ar.Customer)
            .WithMany()
            .HasForeignKey(ar => ar.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ar => ar.Provider)
            .WithMany()
            .HasForeignKey(ar => ar.ProviderId)
            .OnDelete(DeleteBehavior.SetNull);

        // Performance indexes
        builder.HasIndex(ar => ar.Status)
            .HasDatabaseName("IX_AssistanceRequests_Status");

        builder.HasIndex(ar => new { ar.ProviderId, ar.Status })
            .HasDatabaseName("IX_AssistanceRequests_ProviderId_Status");

        builder.HasIndex(ar => new { ar.CustomerId, ar.Status })
            .HasDatabaseName("IX_AssistanceRequests_CustomerId_Status");
    }
}
