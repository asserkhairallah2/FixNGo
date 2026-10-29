using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Repository contract for emergency roadside assistance requests.
/// </summary>
public interface IAssistanceRequestRepository
{
    Task<AssistanceRequest?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<AssistanceRequest?> GetActiveRequestForProviderAsync(string providerId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AssistanceRequest>> GetAvailableRequestsForProviderAsync(string? providerId, AssistanceType? serviceType, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AssistanceRequest>> GetHistoryForProviderAsync(string providerId, AssistanceRequestStatus? statusFilter = null, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AssistanceRequest>> GetAllRequestsForProviderAsync(string providerId, CancellationToken cancellationToken = default);
    Task AddAsync(AssistanceRequest request, CancellationToken cancellationToken = default);
    Task UpdateAsync(AssistanceRequest request, CancellationToken cancellationToken = default);
}
