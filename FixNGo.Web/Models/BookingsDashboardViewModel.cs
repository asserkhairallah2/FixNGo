using System;
using System.Collections.Generic;
using FixNGo.Domain.Enums;

namespace FixNGo.Web.Models;

public enum BookingDashboardStatus
{
    Pending,
    Accepted,
    Rejected
}

public class BookingItemViewModel
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string ServiceName { get; set; } = string.Empty;
    public string ServiceCenterName { get; set; } = string.Empty;
    public string AppointmentDate { get; set; } = string.Empty;
    public string AppointmentTime { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public BookingDashboardStatus Status { get; set; }
    public BookingStatus RawStatus { get; set; }
    public string? Notes { get; set; }
}

public class BookingsDashboardViewModel
{
    public int ServiceCenterId { get; set; } = 1;
    public string CenterName { get; set; } = "FixNGo Certified Centers";
    public List<BookingItemViewModel> Bookings { get; set; } = new();

    public BookingStatus? CurrentStatus { get; set; }
    public string? CurrentSearch { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }

    public int PendingCount { get; set; }
    public int AcceptedCount { get; set; }
    public int RejectedCount { get; set; }
}
