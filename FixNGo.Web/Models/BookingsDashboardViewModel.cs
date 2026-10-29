using System;
using System.Collections.Generic;

namespace FixNGo.Web.Models;

/// <summary>
/// Status of an incoming service center appointment booking.
/// </summary>
public enum BookingDashboardStatus
{
    Pending,
    Accepted,
    Rejected
}

/// <summary>
/// Represents a single appointment booking entry for the service center owner.
/// </summary>
public class BookingItemViewModel
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string ServiceName { get; set; } = string.Empty;
    public string AppointmentDate { get; set; } = string.Empty;
    public string AppointmentTime { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public BookingDashboardStatus Status { get; set; }
}

/// <summary>
/// View model for the complete Bookings Dashboard page.
/// </summary>
public class BookingsDashboardViewModel
{
    public int ServiceCenterId { get; set; } = 1;
    public string CenterName { get; set; } = "Al-Nasr Certified Service Center";
    public List<BookingItemViewModel> Bookings { get; set; } = new();

    public int TotalCount => Bookings.Count;
    public int PendingCount => Bookings.FindAll(b => b.Status == BookingDashboardStatus.Pending).Count;
    public int AcceptedCount => Bookings.FindAll(b => b.Status == BookingDashboardStatus.Accepted).Count;
    public int RejectedCount => Bookings.FindAll(b => b.Status == BookingDashboardStatus.Rejected).Count;
}
