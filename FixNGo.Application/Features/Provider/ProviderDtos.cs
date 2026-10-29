using System;
using System.Collections.Generic;
using FixNGo.Domain.Enums;

namespace FixNGo.Application.Features.Provider;

public class ProviderDashboardDto
{
    public string ProviderId { get; set; } = string.Empty;
    public string ProviderName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public bool IsOnline { get; set; }
    public VerificationStatus VerificationStatus { get; set; }
    public AssistanceType PrimaryServiceType { get; set; }
    public decimal Rating { get; set; }
    public int TotalReviews { get; set; }
    public int CompletedJobsCount { get; set; }
    public string? OperatingCity { get; set; }

    public ProviderActiveRequestDto? ActiveRequest { get; set; }
    public IReadOnlyList<ProviderRequestSummaryDto> IncomingRequests { get; set; } = new List<ProviderRequestSummaryDto>();

    public decimal TotalGrossEarnings { get; set; }
    public decimal TodayEarnings { get; set; }
    public decimal ThisMonthEarnings { get; set; }
    public decimal PaidEarnings { get; set; }
    public decimal PayableEarnings { get; set; }
}

public class ProviderRequestSummaryDto
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public AssistanceType ServiceType { get; set; }
    public string? ProblemDescription { get; set; }
    public string? CustomerAddress { get; set; }
    public double CustomerLatitude { get; set; }
    public double CustomerLongitude { get; set; }
    public string? VehicleInfo { get; set; }
    public decimal EstimatedFare { get; set; }
    public bool IsP0Emergency { get; set; }
    public AssistanceRequestStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public double? DistanceKm { get; set; }
}

public class ProviderRequestDetailsDto
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? ProviderId { get; set; }
    public AssistanceType ServiceType { get; set; }
    public string? ProblemDescription { get; set; }
    public AssistanceRequestStatus Status { get; set; }
    public string? CustomerAddress { get; set; }
    public double CustomerLatitude { get; set; }
    public double CustomerLongitude { get; set; }
    public string? VehicleInfo { get; set; }
    public string? VehiclePlateNumber { get; set; }
    public bool IsP0Emergency { get; set; }
    public decimal EstimatedFare { get; set; }
    public decimal? FinalFare { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? AcceptedAt { get; set; }
    public DateTime? EnRouteAt { get; set; }
    public DateTime? ArrivedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int? Rating { get; set; }
    public string? ReviewText { get; set; }
    public string? PaymentMethod { get; set; }
    public bool IsPaid { get; set; }
    public bool CanAccept { get; set; }
    public bool CanReject { get; set; }
    public bool CanManage { get; set; }
}

public class ProviderActiveRequestDto
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public AssistanceType ServiceType { get; set; }
    public string? ProblemDescription { get; set; }
    public AssistanceRequestStatus Status { get; set; }
    public string? CustomerAddress { get; set; }
    public double CustomerLatitude { get; set; }
    public double CustomerLongitude { get; set; }
    public double? ProviderLatitude { get; set; }
    public double? ProviderLongitude { get; set; }
    public string? VehicleInfo { get; set; }
    public string? VehiclePlateNumber { get; set; }
    public bool IsP0Emergency { get; set; }
    public decimal EstimatedFare { get; set; }
    public decimal? FinalFare { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? AcceptedAt { get; set; }
    public DateTime? EnRouteAt { get; set; }
    public DateTime? ArrivedAt { get; set; }
}

public class ProviderEarningsDto
{
    public decimal TotalGrossEarnings { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal PayableAmount { get; set; }
    public decimal PlatformFeeRate { get; set; } = 0.0m; // Clearly documented as TBD in SRS/SAD
    public decimal PlatformFeeTotal { get; set; } = 0.0m;
    public decimal NetEarnings => TotalGrossEarnings - PlatformFeeTotal;
    public int TotalCompletedJobs { get; set; }
    public IReadOnlyList<ProviderEarningsItemDto> Items { get; set; } = new List<ProviderEarningsItemDto>();
}

public class ProviderEarningsItemDto
{
    public int RequestId { get; set; }
    public DateTime ServiceDate { get; set; }
    public AssistanceType ServiceType { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = "Cash";
    public bool IsPaid { get; set; }
    public int? Rating { get; set; }
}

public class ProviderHistoryItemDto
{
    public int RequestId { get; set; }
    public DateTime Date { get; set; }
    public AssistanceType ServiceType { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string? CustomerAddress { get; set; }
    public decimal Fare { get; set; }
    public AssistanceRequestStatus Status { get; set; }
    public int? Rating { get; set; }
    public string? ReviewText { get; set; }
    public string? CancellationReason { get; set; }
}

public class ProviderProfileDto
{
    public string UserId { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public AssistanceType PrimaryServiceType { get; set; }
    public bool IsOnline { get; set; }
    public VerificationStatus VerificationStatus { get; set; }
    public string? NationalId { get; set; }
    public string? DriverLicenseNumber { get; set; }
    public string? VehiclePlateNumber { get; set; }
    public decimal Rating { get; set; }
    public int TotalReviews { get; set; }
    public int CompletedJobsCount { get; set; }
    public string? City { get; set; }
    public string? Bio { get; set; }
}

public class UpdateProviderProfileDto
{
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public AssistanceType PrimaryServiceType { get; set; }
    public string? NationalId { get; set; }
    public string? DriverLicenseNumber { get; set; }
    public string? VehiclePlateNumber { get; set; }
    public string? City { get; set; }
    public string? Bio { get; set; }
}
