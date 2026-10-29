using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Integrations;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Common;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Domain.Rules;

namespace FixNGo.Application.Features.Provider;

public class ProviderService : IProviderService
{
    private readonly IAssistanceRequestRepository _requestRepository;
    private readonly IProviderRepository _providerRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapService _mapService;

    public ProviderService(
        IAssistanceRequestRepository requestRepository,
        IProviderRepository providerRepository,
        IUnitOfWork unitOfWork,
        IMapService mapService)
    {
        _requestRepository = requestRepository;
        _providerRepository = providerRepository;
        _unitOfWork = unitOfWork;
        _mapService = mapService;
    }

    public async Task<ProviderDashboardDto> GetDashboardAsync(string providerId, CancellationToken cancellationToken = default)
    {
        var user = await _providerRepository.GetByIdAsync(providerId, cancellationToken);
        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);

        var activeRequest = await _requestRepository.GetActiveRequestForProviderAsync(providerId, cancellationToken);
        var incomingRequests = await _requestRepository.GetAvailableRequestsForProviderAsync(
            providerId,
            profile.PrimaryServiceType,
            cancellationToken);

        var allRequests = await _requestRepository.GetAllRequestsForProviderAsync(providerId, cancellationToken);
        var completedRequests = allRequests
            .Where(r => r.Status is AssistanceRequestStatus.Completed or AssistanceRequestStatus.Paid)
            .ToList();

        decimal totalGross = completedRequests.Sum(r => r.FinalFare ?? r.EstimatedFare);
        var today = DateTime.UtcNow.Date;
        decimal todayEarnings = completedRequests
            .Where(r => (r.CompletedAt ?? r.CreatedAt).Date == today)
            .Sum(r => r.FinalFare ?? r.EstimatedFare);

        var currentMonth = DateTime.UtcNow.Month;
        var currentYear = DateTime.UtcNow.Year;
        decimal thisMonthEarnings = completedRequests
            .Where(r => (r.CompletedAt ?? r.CreatedAt).Month == currentMonth && (r.CompletedAt ?? r.CreatedAt).Year == currentYear)
            .Sum(r => r.FinalFare ?? r.EstimatedFare);

        decimal paidEarnings = completedRequests
            .Where(r => r.IsPaid)
            .Sum(r => r.FinalFare ?? r.EstimatedFare);

        decimal payableEarnings = completedRequests
            .Where(r => !r.IsPaid)
            .Sum(r => r.FinalFare ?? r.EstimatedFare);

        return new ProviderDashboardDto
        {
            ProviderId = providerId,
            ProviderName = user?.FullName ?? "Service Provider",
            Email = user?.Email ?? string.Empty,
            Phone = user?.PhoneNumber ?? string.Empty,
            IsOnline = profile.IsOnline,
            VerificationStatus = profile.VerificationStatus,
            PrimaryServiceType = profile.PrimaryServiceType,
            Rating = profile.Rating,
            TotalReviews = profile.TotalReviews,
            CompletedJobsCount = profile.CompletedJobsCount,
            OperatingCity = profile.City ?? "Cairo & Highways",
            ActiveRequest = activeRequest != null ? MapToActiveDto(activeRequest) : null,
            IncomingRequests = incomingRequests.Take(5).Select(MapToSummaryDto).ToList(),
            TotalGrossEarnings = totalGross,
            TodayEarnings = todayEarnings,
            ThisMonthEarnings = thisMonthEarnings,
            PaidEarnings = paidEarnings,
            PayableEarnings = payableEarnings
        };
    }

    public async Task<IReadOnlyList<ProviderRequestSummaryDto>> GetIncomingRequestsAsync(
        string providerId,
        AssistanceType? filterType = null,
        CancellationToken cancellationToken = default)
    {
        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);
        var requests = await _requestRepository.GetAvailableRequestsForProviderAsync(
            providerId,
            filterType ?? profile.PrimaryServiceType,
            cancellationToken);

        if (filterType.HasValue)
        {
            requests = requests.Where(r => r.ServiceType == filterType.Value).ToList();
        }

        return requests.Select(MapToSummaryDto).ToList();
    }

    public async Task<ProviderRequestDetailsDto?> GetRequestDetailsAsync(int requestId, string providerId, CancellationToken cancellationToken = default)
    {
        var request = await _requestRepository.GetByIdAsync(requestId, cancellationToken);
        if (request == null)
            return null;

        // Security check: provider can see open requests OR requests assigned to them
        bool isAssigned = request.ProviderId == providerId;
        bool isOpen = request.Status == AssistanceRequestStatus.Open;

        if (!isAssigned && !isOpen)
        {
            return null; // IDOR protection: cannot inspect requests assigned to other providers
        }

        return new ProviderRequestDetailsDto
        {
            Id = request.Id,
            CustomerId = request.CustomerId,
            CustomerName = request.CustomerName,
            CustomerPhone = isAssigned ? request.CustomerPhone : MaskPhoneNumber(request.CustomerPhone), // Data minimization per SAD NFR-12
            ProviderId = request.ProviderId,
            ServiceType = request.ServiceType,
            ProblemDescription = request.ProblemDescription,
            Status = request.Status,
            CustomerAddress = request.CustomerAddress,
            CustomerLatitude = request.CustomerLatitude,
            CustomerLongitude = request.CustomerLongitude,
            VehicleInfo = request.VehicleInfo,
            VehiclePlateNumber = isAssigned ? request.VehiclePlateNumber : null,
            IsP0Emergency = request.IsP0Emergency,
            EstimatedFare = request.EstimatedFare,
            FinalFare = request.FinalFare,
            CreatedAt = request.CreatedAt,
            AcceptedAt = request.AcceptedAt,
            EnRouteAt = request.EnRouteAt,
            ArrivedAt = request.ArrivedAt,
            CompletedAt = request.CompletedAt,
            Rating = request.Rating,
            ReviewText = request.ReviewText,
            PaymentMethod = request.PaymentMethod,
            IsPaid = request.IsPaid,
            CanAccept = isOpen && string.IsNullOrEmpty(request.ProviderId),
            CanReject = isAssigned && request.Status is AssistanceRequestStatus.Open or AssistanceRequestStatus.Accepted,
            CanManage = isAssigned && request.Status is AssistanceRequestStatus.Accepted or AssistanceRequestStatus.EnRoute or AssistanceRequestStatus.Arrived or AssistanceRequestStatus.InService
        };
    }

    public async Task<ProviderActiveRequestDto?> GetActiveRequestAsync(string providerId, CancellationToken cancellationToken = default)
    {
        var activeRequest = await _requestRepository.GetActiveRequestForProviderAsync(providerId, cancellationToken);
        return activeRequest != null ? MapToActiveDto(activeRequest) : null;
    }

    public async Task<Result> AcceptRequestAsync(int requestId, string providerId, CancellationToken cancellationToken = default)
    {
        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);
        if (profile.VerificationStatus != VerificationStatus.Verified)
        {
            return Result.Failure("Your provider account is pending administrative verification. Only verified providers can accept requests (SRS FR-05).");
        }

        if (!profile.IsOnline)
        {
            return Result.Failure("You must be Online to accept emergency assistance requests (SAD UC-21).");
        }

        var activeRequest = await _requestRepository.GetActiveRequestForProviderAsync(providerId, cancellationToken);
        if (activeRequest != null)
        {
            return Result.Failure("You already have an active request in progress. Complete your current job before accepting a new one.");
        }

        var request = await _requestRepository.GetByIdAsync(requestId, cancellationToken);
        if (request == null)
        {
            return Result.Failure("The requested assistance ticket does not exist.");
        }

        if (request.Status != AssistanceRequestStatus.Open)
        {
            return Result.Failure("This request is no longer open for acceptance.");
        }

        if (!string.IsNullOrEmpty(request.ProviderId) && request.ProviderId != providerId)
        {
            return Result.Failure("This request has already been assigned to another provider.");
        }

        try
        {
            request.Accept(providerId);
            await _requestRepository.UpdateAsync(request, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
        catch (InvalidOperationException ex)
        {
            return Result.Failure(ex.Message);
        }
    }

    public async Task<Result> RejectRequestAsync(int requestId, string providerId, string? reason, CancellationToken cancellationToken = default)
    {
        var request = await _requestRepository.GetByIdAsync(requestId, cancellationToken);
        if (request == null)
            return Result.Failure("Request not found.");

        if (request.ProviderId == providerId && request.Status == AssistanceRequestStatus.Open)
        {
            request.ProviderId = null;
            request.RejectionReason = reason ?? "Provider declined offer";
            await _requestRepository.UpdateAsync(request, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }

        return Result.Success();
    }

    public async Task<Result> UpdateStatusAsync(int requestId, string providerId, AssistanceRequestStatus newStatus, CancellationToken cancellationToken = default)
    {
        var request = await _requestRepository.GetByIdAsync(requestId, cancellationToken);
        if (request == null)
            return Result.Failure("Assistance request not found.");

        if (request.ProviderId != providerId)
            return Result.Failure("Security violation: You are not authorized to update this request.");

        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(request.Status, newStatus);
        if (!transitionResult.IsSuccess)
        {
            return Result.Failure(transitionResult.Error ?? "Invalid status transition.");
        }

        try
        {
            switch (newStatus)
            {
                case AssistanceRequestStatus.EnRoute:
                    request.StartTrip();
                    break;
                case AssistanceRequestStatus.Arrived:
                    request.MarkArrived();
                    break;
                case AssistanceRequestStatus.InService:
                    request.StartService();
                    break;
                case AssistanceRequestStatus.Completed:
                    request.Complete();
                    var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);
                    profile.IncrementCompletedJobs();
                    await _providerRepository.UpdateProfileAsync(profile, cancellationToken);
                    break;
                case AssistanceRequestStatus.Cancelled:
                    request.Cancel("Cancelled by provider");
                    break;
                default:
                    return Result.Failure($"Invalid direct status transition to '{newStatus}'.");
            }

            await _requestRepository.UpdateAsync(request, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
        catch (InvalidOperationException ex)
        {
            return Result.Failure(ex.Message);
        }
    }

    public async Task<Result> CompleteServiceAsync(int requestId, string providerId, decimal? finalFare, CancellationToken cancellationToken = default)
    {
        var request = await _requestRepository.GetByIdAsync(requestId, cancellationToken);
        if (request == null)
            return Result.Failure("Assistance request not found.");

        if (request.ProviderId != providerId)
            return Result.Failure("Unauthorized: You are not the assigned provider for this request.");

        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(request.Status, AssistanceRequestStatus.Completed);
        if (!transitionResult.IsSuccess)
        {
            return Result.Failure(transitionResult.Error ?? "Invalid status transition.");
        }

        try
        {
            request.Complete(finalFare);

            var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);
            profile.IncrementCompletedJobs();
            await _providerRepository.UpdateProfileAsync(profile, cancellationToken);

            await _requestRepository.UpdateAsync(request, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
        catch (InvalidOperationException ex)
        {
            return Result.Failure(ex.Message);
        }
    }

    public async Task<Result<bool>> ToggleAvailabilityAsync(string providerId, CancellationToken cancellationToken = default)
    {
        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);

        if (!profile.IsOnline)
        {
            if (profile.VerificationStatus != VerificationStatus.Verified)
            {
                return Result<bool>.Failure("Your account is pending verification by platform administrators. Only verified providers can go online (SRS FR-05, SAD UC-21).");
            }
        }
        else
        {
            var activeRequest = await _requestRepository.GetActiveRequestForProviderAsync(providerId, cancellationToken);
            if (activeRequest != null)
            {
                return Result<bool>.Failure("Cannot switch to Offline while you have an active roadside mission in progress.");
            }
        }

        try
        {
            profile.ToggleOnline();
            await _providerRepository.UpdateProfileAsync(profile, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(profile.IsOnline);
        }
        catch (InvalidOperationException ex)
        {
            return Result<bool>.Failure(ex.Message);
        }
    }

    public async Task<ProviderEarningsDto> GetEarningsAsync(
        string providerId,
        string? period = "all",
        CancellationToken cancellationToken = default)
    {
        var requests = await _requestRepository.GetAllRequestsForProviderAsync(providerId, cancellationToken);
        var completedList = requests
            .Where(r => r.Status is AssistanceRequestStatus.Completed or AssistanceRequestStatus.Paid)
            .OrderByDescending(r => r.CompletedAt ?? r.CreatedAt)
            .ToList();

        if (string.Equals(period, "today", StringComparison.OrdinalIgnoreCase))
        {
            var today = DateTime.UtcNow.Date;
            completedList = completedList.Where(r => (r.CompletedAt ?? r.CreatedAt).Date == today).ToList();
        }
        else if (string.Equals(period, "month", StringComparison.OrdinalIgnoreCase))
        {
            var month = DateTime.UtcNow.Month;
            var year = DateTime.UtcNow.Year;
            completedList = completedList.Where(r => (r.CompletedAt ?? r.CreatedAt).Month == month && (r.CompletedAt ?? r.CreatedAt).Year == year).ToList();
        }

        decimal totalGross = completedList.Sum(r => r.FinalFare ?? r.EstimatedFare);
        decimal paid = completedList.Where(r => r.IsPaid).Sum(r => r.FinalFare ?? r.EstimatedFare);
        decimal payable = completedList.Where(r => !r.IsPaid).Sum(r => r.FinalFare ?? r.EstimatedFare);

        var items = completedList.Select(r => new ProviderEarningsItemDto
        {
            RequestId = r.Id,
            ServiceDate = r.CompletedAt ?? r.CreatedAt,
            ServiceType = r.ServiceType,
            CustomerName = r.CustomerName,
            Amount = r.FinalFare ?? r.EstimatedFare,
            PaymentMethod = r.PaymentMethod ?? "Cash",
            IsPaid = r.IsPaid,
            Rating = r.Rating
        }).ToList();

        return new ProviderEarningsDto
        {
            TotalGrossEarnings = totalGross,
            PaidAmount = paid,
            PayableAmount = payable,
            TotalCompletedJobs = completedList.Count,
            PlatformFeeRate = 0.0m, // Noted as TBD in SRS/SAD
            PlatformFeeTotal = 0.0m,
            Items = items
        };
    }

    public async Task<IReadOnlyList<ProviderHistoryItemDto>> GetHistoryAsync(
        string providerId,
        AssistanceRequestStatus? statusFilter = null,
        string? search = null,
        CancellationToken cancellationToken = default)
    {
        var requests = await _requestRepository.GetHistoryForProviderAsync(providerId, statusFilter, cancellationToken);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            requests = requests.Where(r =>
                r.CustomerName.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                (r.CustomerAddress != null && r.CustomerAddress.Contains(term, StringComparison.OrdinalIgnoreCase)) ||
                (r.ProblemDescription != null && r.ProblemDescription.Contains(term, StringComparison.OrdinalIgnoreCase)) ||
                (r.VehicleInfo != null && r.VehicleInfo.Contains(term, StringComparison.OrdinalIgnoreCase))
            ).ToList();
        }

        return requests.Select(r => new ProviderHistoryItemDto
        {
            RequestId = r.Id,
            Date = r.CompletedAt ?? r.CancelledAt ?? r.CreatedAt,
            ServiceType = r.ServiceType,
            CustomerName = r.CustomerName,
            CustomerAddress = r.CustomerAddress,
            Fare = r.FinalFare ?? r.EstimatedFare,
            Status = r.Status,
            Rating = r.Rating,
            ReviewText = r.ReviewText,
            CancellationReason = r.CancellationReason
        }).ToList();
    }

    public async Task<ProviderProfileDto?> GetProfileAsync(string providerId, CancellationToken cancellationToken = default)
    {
        var user = await _providerRepository.GetByIdAsync(providerId, cancellationToken);
        if (user == null)
            return null;

        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);

        return new ProviderProfileDto
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email ?? string.Empty,
            Phone = user.PhoneNumber ?? string.Empty,
            PrimaryServiceType = profile.PrimaryServiceType,
            IsOnline = profile.IsOnline,
            VerificationStatus = profile.VerificationStatus,
            NationalId = profile.NationalId,
            DriverLicenseNumber = profile.DriverLicenseNumber,
            VehiclePlateNumber = profile.VehiclePlateNumber,
            Rating = profile.Rating,
            TotalReviews = profile.TotalReviews,
            CompletedJobsCount = profile.CompletedJobsCount,
            City = profile.City,
            Bio = profile.Bio
        };
    }

    public async Task<Result> UpdateProfileAsync(string providerId, UpdateProviderProfileDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _providerRepository.GetByIdAsync(providerId, cancellationToken);
        if (user == null)
            return Result.Failure("Provider account not found.");

        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);

        if (!string.IsNullOrWhiteSpace(dto.FullName))
            user.FullName = dto.FullName.Trim();

        if (!string.IsNullOrWhiteSpace(dto.Phone))
            user.PhoneNumber = dto.Phone.Trim();

        profile.PrimaryServiceType = dto.PrimaryServiceType;
        profile.NationalId = dto.NationalId?.Trim();
        profile.DriverLicenseNumber = dto.DriverLicenseNumber?.Trim();
        profile.VehiclePlateNumber = dto.VehiclePlateNumber?.Trim();
        profile.City = dto.City?.Trim();
        profile.Bio = dto.Bio?.Trim();

        await _providerRepository.UpdateProfileAsync(profile, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }

    public async Task<Result> UpdateLiveLocationAsync(string providerId, double latitude, double longitude, CancellationToken cancellationToken = default)
    {
        var profile = await GetOrCreateProfileAsync(providerId, cancellationToken);
        profile.UpdateLocation(latitude, longitude);
        await _providerRepository.UpdateProfileAsync(profile, cancellationToken);

        var activeRequest = await _requestRepository.GetActiveRequestForProviderAsync(providerId, cancellationToken);
        if (activeRequest != null && activeRequest.Status == AssistanceRequestStatus.EnRoute)
        {
            activeRequest.UpdateProviderLocation(latitude, longitude);
            await _requestRepository.UpdateAsync(activeRequest, cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }

    // Private Helpers
    private async Task<ProviderProfile> GetOrCreateProfileAsync(string providerId, CancellationToken cancellationToken)
    {
        var profile = await _providerRepository.GetProfileByUserIdAsync(providerId, cancellationToken);
        if (profile != null)
            return profile;

        profile = new ProviderProfile
        {
            UserId = providerId,
            PrimaryServiceType = AssistanceType.Mechanic,
            VerificationStatus = VerificationStatus.Verified, // Default to Verified for initial seed/demo providers
            IsOnline = true,
            Rating = 4.9m,
            TotalReviews = 18,
            CompletedJobsCount = 24,
            City = "Cairo - Desert Road & 6th of October",
            Bio = "Professional mobile mechanic and tow truck operator with 8+ years experience."
        };

        await _providerRepository.AddProfileAsync(profile, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return profile;
    }

    private static ProviderRequestSummaryDto MapToSummaryDto(AssistanceRequest request) => new()
    {
        Id = request.Id,
        CustomerName = request.CustomerName,
        CustomerPhone = request.CustomerPhone,
        ServiceType = request.ServiceType,
        ProblemDescription = request.ProblemDescription,
        CustomerAddress = request.CustomerAddress,
        CustomerLatitude = request.CustomerLatitude,
        CustomerLongitude = request.CustomerLongitude,
        VehicleInfo = request.VehicleInfo,
        EstimatedFare = request.EstimatedFare,
        IsP0Emergency = request.IsP0Emergency,
        Status = request.Status,
        CreatedAt = request.CreatedAt
    };

    private static ProviderActiveRequestDto MapToActiveDto(AssistanceRequest request) => new()
    {
        Id = request.Id,
        CustomerId = request.CustomerId,
        CustomerName = request.CustomerName,
        CustomerPhone = request.CustomerPhone,
        ServiceType = request.ServiceType,
        ProblemDescription = request.ProblemDescription,
        Status = request.Status,
        CustomerAddress = request.CustomerAddress,
        CustomerLatitude = request.CustomerLatitude,
        CustomerLongitude = request.CustomerLongitude,
        ProviderLatitude = request.ProviderLatitude,
        ProviderLongitude = request.ProviderLongitude,
        VehicleInfo = request.VehicleInfo,
        VehiclePlateNumber = request.VehiclePlateNumber,
        IsP0Emergency = request.IsP0Emergency,
        EstimatedFare = request.EstimatedFare,
        FinalFare = request.FinalFare,
        CreatedAt = request.CreatedAt,
        AcceptedAt = request.AcceptedAt,
        EnRouteAt = request.EnRouteAt,
        ArrivedAt = request.ArrivedAt
    };

    private static string MaskPhoneNumber(string? phone)
    {
        if (string.IsNullOrWhiteSpace(phone) || phone.Length < 7)
            return "010****" + (phone?.Length > 3 ? phone[^3..] : "000");

        return phone[..4] + "****" + phone[^3..];
    }
}
