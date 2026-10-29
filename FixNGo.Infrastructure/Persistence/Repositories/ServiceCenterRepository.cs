using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Infrastructure.Persistence.Repositories;

public class ServiceCenterRepository : IServiceCenterRepository
{
    private readonly AppDbContext _context;

    public ServiceCenterRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ServiceCenter?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.ServiceCenters
            .Include(sc => sc.Services)
            .Include(sc => sc.WorkingHours)
            .FirstOrDefaultAsync(sc => sc.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<ServiceCenter>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.ServiceCenters
            .Include(sc => sc.Services)
            .Include(sc => sc.WorkingHours)
            .ToListAsync(cancellationToken);
    }

    public async Task<ServiceCenter> AddAsync(ServiceCenter serviceCenter, CancellationToken cancellationToken = default)
    {
        await _context.ServiceCenters.AddAsync(serviceCenter, cancellationToken);
        return serviceCenter;
    }

    public Task UpdateAsync(ServiceCenter serviceCenter, CancellationToken cancellationToken = default)
    {
        _context.ServiceCenters.Update(serviceCenter);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(ServiceCenter serviceCenter, CancellationToken cancellationToken = default)
    {
        _context.ServiceCenters.Remove(serviceCenter);
        return Task.CompletedTask;
    }
}

