using System;
using System.Collections.Generic;
using FixNGo.Domain.Common;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Service entity offered by a Service Center (SAD UC-26, SRS FR-34).
/// Represents automotive maintenance or repair packages (e.g., Oil Change, Brake Inspection).
/// </summary>
public class Service : BaseEntity
{
    /// <summary>
    /// Foreign key referencing the parent Service Center.
    /// </summary>
    public int ServiceCenterId { get; set; }

    /// <summary>
    /// Service title / name in primary language (Arabic).
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Service title / name in English for bilingual support.
    /// </summary>
    public string? NameEn { get; set; }

    /// <summary>
    /// Detailed description of what is included in the service.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Standard base price for the service in Egyptian Pounds (EGP).
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Estimated service duration in minutes (used to calculate appointment slot availability).
    /// </summary>
    public int EstimatedDurationMinutes { get; set; } = 60;

    /// <summary>
    /// Indicates whether the service is currently offered and visible to customers.
    /// </summary>
    public bool IsActive { get; set; } = true;

    // Navigation Properties
    public virtual ServiceCenter ServiceCenter { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    // Domain Invariants & Business Logic
    /// <summary>
    /// Updates service price ensuring it remains strictly positive.
    /// </summary>
    public void UpdatePrice(decimal newPrice)
    {
        if (newPrice < 0)
            throw new ArgumentOutOfRangeException(nameof(newPrice), "Service price cannot be negative.");

        Price = newPrice;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Toggles service availability in the published catalog.
    /// </summary>
    public void SetAvailability(bool isAvailable)
    {
        IsActive = isAvailable;
        UpdatedAt = DateTime.UtcNow;
    }
}

