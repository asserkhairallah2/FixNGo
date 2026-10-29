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

    private DbSet<AssistanceRequest> Requests => _context.Set<AssistanceRequest>();

    public async Task<AssistanceRequest?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await Requests.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
    }

    public async Task<AssistanceRequest?> GetActiveRequestForProviderAsync(string providerId, CancellationToken cancellationToken = default)
    {
        return await Requests
            .Where(r => r.ProviderId == providerId &&
                        (r.Status == AssistanceRequestStatus.Accepted ||
                         r.Status == AssistanceRequestStatus.EnRoute ||
                         r.Status == AssistanceRequestStatus.Arrived ||
                         r.Status == AssistanceRequestStatus.InService))
            .OrderByDescending(r => r.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<AssistanceRequest>> GetAvailableRequestsForProviderAsync(string? providerId, AssistanceType? serviceType, CancellationToken cancellationToken = default)
    {
        var query = Requests.Where(r => r.Status == AssistanceRequestStatus.Open);
        if (serviceType.HasValue)
            query = query.Where(r => r.ServiceType == serviceType.Value);

        return await query.OrderByDescending(r => r.IsP0Emergency).ThenBy(r => r.Id).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<AssistanceRequest>> GetHistoryForProviderAsync(string providerId, AssistanceRequestStatus? statusFilter = null, CancellationToken cancellationToken = default)
    {
        var query = Requests.Where(r => r.ProviderId == providerId &&
            (r.Status == AssistanceRequestStatus.Completed ||
             r.Status == AssistanceRequestStatus.Paid ||
             r.Status == AssistanceRequestStatus.Cancelled));
        if (statusFilter.HasValue)
            query = query.Where(r => r.Status == statusFilter.Value);

        return await query.OrderByDescending(r => r.Id).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<AssistanceRequest>> GetAllRequestsForProviderAsync(string providerId, CancellationToken cancellationToken = default)
    {
        return await Requests.Where(r => r.ProviderId == providerId)
            .OrderByDescending(r => r.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(AssistanceRequest request, CancellationToken cancellationToken = default)
    {
        await Requests.AddAsync(request, cancellationToken);
    }

    public Task UpdateAsync(AssistanceRequest request, CancellationToken cancellationToken = default)
    {
        Requests.Update(request);
        return Task.CompletedTask;
    }
}
