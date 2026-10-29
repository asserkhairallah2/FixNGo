using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Infrastructure.Persistence.Repositories;

public class AssistanceRequestRepository : IAssistanceRequestRepository
{
    private readonly AppDbContext _context;

    public AssistanceRequestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AssistanceRequest?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.AssistanceRequests
            .Include(ar => ar.Customer)
            .Include(ar => ar.Provider)
            .FirstOrDefaultAsync(ar => ar.Id == id, cancellationToken);
    }

    public async Task<AssistanceRequest?> GetActiveRequestForProviderAsync(string providerId, CancellationToken cancellationToken = default)
    {
        return await _context.AssistanceRequests
            .Include(ar => ar.Customer)
            .Where(ar => ar.ProviderId == providerId &&
                         (ar.Status == AssistanceRequestStatus.Accepted ||
                          ar.Status == AssistanceRequestStatus.EnRoute ||
                          ar.Status == AssistanceRequestStatus.Arrived ||
                          ar.Status == AssistanceRequestStatus.InService))
            .OrderByDescending(ar => ar.AcceptedAt ?? ar.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<AssistanceRequest>> GetAvailableRequestsForProviderAsync(
        string? providerId,
        AssistanceType? serviceType,
        CancellationToken cancellationToken = default)
    {
        var query = _context.AssistanceRequests
            .Include(ar => ar.Customer)
            .Where(ar => ar.Status == AssistanceRequestStatus.Open &&
                         (string.IsNullOrEmpty(ar.ProviderId) || ar.ProviderId == providerId));

        if (serviceType.HasValue && serviceType.Value != AssistanceType.Other)
        {
            query = query.Where(ar => ar.ServiceType == serviceType.Value || ar.ServiceType == AssistanceType.Other);
        }

        return await query
            .OrderByDescending(ar => ar.IsP0Emergency) // Emergency P0 requests first per SAD NFR-05
            .ThenByDescending(ar => ar.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<AssistanceRequest>> GetHistoryForProviderAsync(
        string providerId,
        AssistanceRequestStatus? statusFilter = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.AssistanceRequests
            .Include(ar => ar.Customer)
            .Where(ar => ar.ProviderId == providerId);

        if (statusFilter.HasValue)
        {
            query = query.Where(ar => ar.Status == statusFilter.Value);
        }
        else
        {
            query = query.Where(ar => ar.Status == AssistanceRequestStatus.Completed ||
                                      ar.Status == AssistanceRequestStatus.Paid ||
                                      ar.Status == AssistanceRequestStatus.Cancelled);
        }

        return await query
            .OrderByDescending(ar => ar.CompletedAt ?? ar.CancelledAt ?? ar.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<AssistanceRequest>> GetAllRequestsForProviderAsync(
        string providerId,
        CancellationToken cancellationToken = default)
    {
        return await _context.AssistanceRequests
            .Include(ar => ar.Customer)
            .Where(ar => ar.ProviderId == providerId)
            .OrderByDescending(ar => ar.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(AssistanceRequest request, CancellationToken cancellationToken = default)
    {
        await _context.AssistanceRequests.AddAsync(request, cancellationToken);
    }

    public Task UpdateAsync(AssistanceRequest request, CancellationToken cancellationToken = default)
    {
        _context.AssistanceRequests.Update(request);
        return Task.CompletedTask;
    }
}
