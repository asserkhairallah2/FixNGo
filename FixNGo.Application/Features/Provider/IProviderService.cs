using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;

namespace FixNGo.Application.Features.Provider;

public interface IProviderService
{
    Task<ProviderDashboardDto> GetDashboardAsync(string providerId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<ProviderRequestSummaryDto>> GetIncomingRequestsAsync(string providerId, AssistanceType? filterType = null, CancellationToken cancellationToken = default);

    Task<ProviderRequestDetailsDto?> GetRequestDetailsAsync(int requestId, string providerId, CancellationToken cancellationToken = default);

    Task<ProviderActiveRequestDto?> GetActiveRequestAsync(string providerId, CancellationToken cancellationToken = default);

    Task<Result> AcceptRequestAsync(int requestId, string providerId, CancellationToken cancellationToken = default);

    Task<Result> RejectRequestAsync(int requestId, string providerId, string? reason, CancellationToken cancellationToken = default);

    Task<Result> UpdateStatusAsync(int requestId, string providerId, AssistanceRequestStatus newStatus, CancellationToken cancellationToken = default);

    Task<Result> CompleteServiceAsync(int requestId, string providerId, decimal? finalFare, CancellationToken cancellationToken = default);

    Task<Result<bool>> ToggleAvailabilityAsync(string providerId, CancellationToken cancellationToken = default);

    Task<ProviderEarningsDto> GetEarningsAsync(string providerId, string? period = "all", CancellationToken cancellationToken = default);

    Task<IReadOnlyList<ProviderHistoryItemDto>> GetHistoryAsync(string providerId, AssistanceRequestStatus? statusFilter = null, string? search = null, CancellationToken cancellationToken = default);

    Task<ProviderProfileDto?> GetProfileAsync(string providerId, CancellationToken cancellationToken = default);

    Task<Result> UpdateProfileAsync(string providerId, UpdateProviderProfileDto dto, CancellationToken cancellationToken = default);

    Task<Result> UpdateLiveLocationAsync(string providerId, double latitude, double longitude, CancellationToken cancellationToken = default);
}
