using System;
using System.Collections.Generic;
using System.Linq;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Service Center entity representing an automotive repair shop or service garage (SAD UC-14, UC-26, UC-27).
/// </summary>
public class ServiceCenter : BaseEntity
{
    /// <summary>
    /// Center name in primary language (Arabic).
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Center name in English for bilingual support.
    /// </summary>
    public string? NameEn { get; set; }

    /// <summary>
    /// Contact telephone / mobile number.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Physical location address text / landmark.
    /// </summary>
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// GPS Latitude coordinate for geospatial proximity matching.
    /// </summary>
    public double Latitude { get; set; }

    /// <summary>
    /// GPS Longitude coordinate for geospatial proximity matching.
    /// </summary>
    public double Longitude { get; set; }

    /// <summary>
    /// Administrative verification status (Pending, Verified, Rejected, Suspended).
    /// </summary>
    public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.Pending;

    /// <summary>
    /// Operational status indicating if the center is actively taking bookings.
    /// </summary>
    public bool IsActive { get; set; } = false;

    /// <summary>
    /// Center account password hash if authenticating directly.
    /// </summary>
    public string? PasswordHash { get; set; }

    /// <summary>
    /// Official commercial registration number / tax identifier for verification.
    /// </summary>
    public string? CommercialRegister { get; set; }

    /// <summary>
    /// Aggregated customer rating (from 0.0 to 5.0).
    /// </summary>
    public decimal Rating { get; set; } = 0.00m;

    /// <summary>
    /// Total number of approved customer reviews.
    /// </summary>
    public int TotalReviews { get; set; } = 0;

    /// <summary>
    /// Optional foreign key to ASP.NET Core Identity user account.
    /// </summary>
    public string? UserId { get; set; }

    // Navigation Properties
    public virtual ApplicationUser? User { get; set; }

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();

    public virtual ICollection<WorkingHours> WorkingHours { get; set; } = new List<WorkingHours>();

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    // Domain Invariants & Business Logic
    /// <summary>
    /// Checks whether the service center is scheduled to be open at the specified day and time.
    /// </summary>
    public bool IsOpenAt(DayOfWeek dayOfWeek, TimeSpan time)
    {
        var schedule = WorkingHours.FirstOrDefault(w => w.DayOfWeek == dayOfWeek);
        return schedule != null && schedule.IsOpen(time);
    }

    /// <summary>
    /// Approves registration through admin review, enabling bookings.
    /// </summary>
    public void Approve()
    {
        VerificationStatus = VerificationStatus.Verified;
        IsActive = true;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Rejects registration due to compliance failure.
    /// </summary>
    public void Reject()
    {
        VerificationStatus = VerificationStatus.Rejected;
        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Suspends operations in case of disciplinary violations.
    /// </summary>
    public void Suspend()
    {
        VerificationStatus = VerificationStatus.Suspended;
        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Updates center coordinates and street address.
    /// </summary>
    public void UpdateLocation(double latitude, double longitude, string address)
    {
        if (latitude is < -90.0 or > 90.0)
            throw new ArgumentOutOfRangeException(nameof(latitude), "Latitude must be between -90 and 90.");
        if (longitude is < -180.0 or > 180.0)
            throw new ArgumentOutOfRangeException(nameof(longitude), "Longitude must be between -180 and 180.");

        Latitude = latitude;
        Longitude = longitude;
        Address = address;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Recalculates average rating when a new customer review is accepted.
    /// </summary>
    public void UpdateRating(decimal newRating, int totalReviews)
    {
        Rating = Math.Clamp(newRating, 0.0m, 5.0m);
        TotalReviews = Math.Max(0, totalReviews);
        UpdatedAt = DateTime.UtcNow;
    }
}

