using System;
using FixNGo.Domain.Common;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Working hours definition for a specific day of the week for a Service Center (SAD UC-26).
/// </summary>
public class WorkingHours : BaseEntity
{
    /// <summary>
    /// Foreign key referencing the parent Service Center.
    /// </summary>
    public int ServiceCenterId { get; set; }

    /// <summary>
    /// Day of the week (Sunday through Saturday).
    /// </summary>
    public DayOfWeek DayOfWeek { get; set; }

    /// <summary>
    /// Opening time of the center on this day.
    /// </summary>
    public TimeSpan OpenTime { get; set; }

    /// <summary>
    /// Closing time of the center on this day.
    /// </summary>
    public TimeSpan CloseTime { get; set; }

    /// <summary>
    /// True if the service center is closed on this day (e.g. Friday off).
    /// </summary>
    public bool IsClosed { get; set; } = false;

    // Navigation Property
    public virtual ServiceCenter ServiceCenter { get; set; } = null!;

    // Domain Invariants & Business Logic
    /// <summary>
    /// Determines whether the center is operating at the given time on this day.
    /// </summary>
    public bool IsOpen(TimeSpan time)
    {
        if (IsClosed)
            return false;

        // Normal daytime hours (e.g., 08:00 to 18:00)
        if (OpenTime <= CloseTime)
            return time >= OpenTime && time <= CloseTime;

        // Overnight hours spanning midnight (e.g., 20:00 to 04:00)
        return time >= OpenTime || time <= CloseTime;
    }

    /// <summary>
    /// Updates operational shift hours for this day.
    /// </summary>
    public void SetHours(TimeSpan open, TimeSpan close)
    {
        OpenTime = open;
        CloseTime = close;
        IsClosed = false;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Marks this day as a day-off.
    /// </summary>
    public void MarkAsClosed()
    {
        IsClosed = true;
        UpdatedAt = DateTime.UtcNow;
    }
}

