using System;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Booking entity representing a scheduled maintenance or repair appointment at a Service Center (SAD UC-14, UC-15, UC-27).
/// </summary>
public class Booking : BaseEntity
{
    /// <summary>
    /// Foreign key referencing the Service Center where the booking is made.
    /// </summary>
    public int ServiceCenterId { get; set; }

    /// <summary>
    /// Foreign key referencing the customer user account.
    /// </summary>
    public string CustomerId { get; set; } = string.Empty;

    /// <summary>
    /// Foreign key referencing the customer's vehicle (if assigned).
    /// </summary>
    public int? VehicleId { get; set; }

    /// <summary>
    /// Foreign key referencing the selected maintenance/repair service.
    /// </summary>
    public int ServiceId { get; set; }

    /// <summary>
    /// Date of the scheduled appointment (stored as Date in SQL Server).
    /// </summary>
    public DateOnly AppointmentDate { get; set; }

    /// <summary>
    /// Time of the scheduled appointment (stored as Time in SQL Server).
    /// </summary>
    public TimeSpan AppointmentTime { get; set; }

    /// <summary>
    /// Current status in the booking state machine lifecycle (Pending -> Confirmed / Rejected / Cancelled -> Completed).
    /// </summary>
    public BookingStatus Status { get; set; } = BookingStatus.Pending;

    /// <summary>
    /// Price agreed upon and locked at booking confirmation time in Egyptian Pounds (EGP).
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Additional customer notes or symptoms reported.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Explanation provided by the service center if the booking is rejected.
    /// </summary>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Explanation provided if the booking is cancelled by the customer.
    /// </summary>
    public string? CancellationReason { get; set; }

    /// <summary>
    /// Optional foreign key linking to an emergency assistance request for follow-up repairs (SAD UC-15).
    /// </summary>
    public int? FollowUpEmergencyRequestId { get; set; }

    // Navigation Properties
    public virtual ServiceCenter ServiceCenter { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;

    public virtual ApplicationUser? Customer { get; set; }

    // Domain Invariants & State Transitions
    /// <summary>
    /// Confirms the pending booking by the service center.
    /// </summary>
    public void Confirm()
    {
        if (Status != BookingStatus.Pending)
            throw new InvalidOperationException($"Cannot confirm booking from status '{Status}'. Only Pending bookings can be confirmed.");

        Status = BookingStatus.Confirmed;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Rejects the pending booking by the service center.
    /// </summary>
    public void Reject(string reason)
    {
        if (Status != BookingStatus.Pending)
            throw new InvalidOperationException($"Cannot reject booking from status '{Status}'. Only Pending bookings can be rejected.");

        Status = BookingStatus.Rejected;
        RejectionReason = reason;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Cancels an active or pending booking by the customer.
    /// </summary>
    public void Cancel(string reason)
    {
        if (Status is BookingStatus.Completed or BookingStatus.Rejected or BookingStatus.Cancelled)
            throw new InvalidOperationException($"Cannot cancel booking from terminal status '{Status}'.");

        Status = BookingStatus.Cancelled;
        CancellationReason = reason;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Marks the booking as successfully completed after vehicle repair.
    /// </summary>
    public void Complete()
    {
        if (Status != BookingStatus.Confirmed)
            throw new InvalidOperationException($"Cannot complete booking from status '{Status}'. Only Confirmed bookings can be completed.");

        Status = BookingStatus.Completed;
        UpdatedAt = DateTime.UtcNow;
    }
}

