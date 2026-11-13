using System;
using System.Collections.Generic;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;

namespace FixNGo.Web.ViewModels;

public class AdminDashboardViewModel
{
    public int TotalUsersCount { get; set; }
    public int TotalProvidersCount { get; set; }
    public int TotalServiceCentersCount { get; set; }
    public int TotalBookingsCount { get; set; }
    public int TotalAssistanceRequestsCount { get; set; }
    public int PendingVerificationsCount { get; set; }

    public decimal TotalRevenue { get; set; }
    public int ActiveMissionsCount { get; set; }

    public List<AssistanceRequest> RecentRequests { get; set; } = new();
    public List<Booking> RecentBookings { get; set; } = new();
}

public class AdminRequestsViewModel
{
    public List<AssistanceRequest> Requests { get; set; } = new();
    public AssistanceRequestStatus? SelectedStatus { get; set; }
    public string? Search { get; set; }
    public int CurrentPage { get; set; } = 1;
    public int TotalPages { get; set; } = 1;
    public int TotalCount { get; set; }
}

public class AdminBookingsViewModel
{
    public List<Booking> Bookings { get; set; } = new();
    public BookingStatus? SelectedStatus { get; set; }
    public string? Search { get; set; }
    public int CurrentPage { get; set; } = 1;
    public int TotalPages { get; set; } = 1;
    public int TotalCount { get; set; }
}

public class AdminProvidersViewModel
{
    public List<ProviderProfile> Providers { get; set; } = new();
    public VerificationStatus? SelectedStatus { get; set; }
    public int PendingCount { get; set; }
    public int VerifiedCount { get; set; }
}

public class AdminUserItemViewModel
{
    public string Id { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class AdminUsersViewModel
{
    public List<AdminUserItemViewModel> Users { get; set; } = new();
    public string? SelectedRole { get; set; }
    public string? Search { get; set; }
    public int CurrentPage { get; set; } = 1;
    public int TotalPages { get; set; } = 1;
}
