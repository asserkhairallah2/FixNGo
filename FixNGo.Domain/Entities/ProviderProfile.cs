using System;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Provider Profile entity representing a roadside service mechanic or tow truck driver profile (SRS FR-02, FR-05, FR-18, SAD UC-21).
/// </summary>
public class ProviderProfile : BaseEntity
{
    /// <summary>
    /// Foreign key referencing the provider user account in AspNetUsers.
    /// </summary>
    public string UserId { get; set; } = string.Empty;

    /// <summary>
    /// Primary service specialization offered by this provider.
    /// </summary>
    public AssistanceType PrimaryServiceType { get; set; } = AssistanceType.Mechanic;

    /// <summary>
    /// Operational availability toggle indicating if the provider is currently online and accepting new requests (SAD UC-21).
    /// Gated by administrative verification status.
    /// </summary>
    public bool IsOnline { get; set; } = false;

    /// <summary>
    /// Administrative verification status for compliance and paperwork approval (SRS FR-05, SAD UC-28).
    /// </summary>
    public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.Pending;

    /// <summary>
    /// National ID or commercial registry number submitted for identity verification.
    /// </summary>
    public string? NationalId { get; set; }

    /// <summary>
    /// Driver or trade license number.
    /// </summary>
    public string? DriverLicenseNumber { get; set; }

    /// <summary>
    /// Vehicle plate number for tow trucks or mobile service vans.
    /// </summary>
    public string? VehiclePlateNumber { get; set; }

    /// <summary>
    /// Average customer rating from 0.0 to 5.0 (SRS FR-18, FR-41).
    /// </summary>
    public decimal Rating { get; set; } = 5.0m;

    /// <summary>
    /// Total number of approved customer reviews received.
    /// </summary>
    public int TotalReviews { get; set; } = 0;

    /// <summary>
    /// Total count of successfully completed roadside rescue jobs.
    /// </summary>
    public int CompletedJobsCount { get; set; } = 0;

    /// <summary>
    /// Current or last reported GPS Latitude.
    /// </summary>
    public double? CurrentLatitude { get; set; }

    /// <summary>
    /// Current or last reported GPS Longitude.
    /// </summary>
    public double? CurrentLongitude { get; set; }

    /// <summary>
    /// Operating city or region (e.g., "Cairo - Giza & Desert Road").
    /// </summary>
    public string? City { get; set; }

    /// <summary>
    /// Brief professional bio or equipment description.
    /// </summary>
    public string? Bio { get; set; }

    // Navigation Property
    public virtual ApplicationUser? User { get; set; }

    // Domain Invariants & Business Logic
    /// <summary>
    /// Toggles the provider's availability status between Online and Offline.
    /// Enforces that only verified providers can go online (SAD UC-21, SRS FR-05).
    /// </summary>
    public void ToggleOnline()
    {
        if (!IsOnline)
        {
            if (VerificationStatus != VerificationStatus.Verified)
            {
                throw new InvalidOperationException("Account is pending administrative verification. Only verified providers can go online.");
            }
            IsOnline = true;
        }
        else
        {
            IsOnline = false;
        }

        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Explicitly sets availability status with verification validation.
    /// </summary>
    public void SetOnline(bool online)
    {
        if (online && VerificationStatus != VerificationStatus.Verified)
        {
            throw new InvalidOperationException("Account is pending administrative verification. Only verified providers can go online.");
        }

        IsOnline = online;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Updates average rating based on newly submitted review.
    /// </summary>
    public void AddRating(int newRating)
    {
        if (newRating is < 1 or > 5)
            throw new ArgumentOutOfRangeException(nameof(newRating), "Rating must be between 1 and 5.");

        decimal totalRatingPoints = (Rating * TotalReviews) + newRating;
        TotalReviews++;
        Rating = Math.Clamp(Math.Round(totalRatingPoints / TotalReviews, 2), 1.0m, 5.0m);
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Increments completed jobs counter.
    /// </summary>
    public void IncrementCompletedJobs()
    {
        CompletedJobsCount++;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Updates provider live GPS coordinates.
    /// </summary>
    public void UpdateLocation(double latitude, double longitude)
    {
        CurrentLatitude = latitude;
        CurrentLongitude = longitude;
        UpdatedAt = DateTime.UtcNow;
    }
}
