using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Infrastructure.Persistence.Repositories;

public class ProviderRepository : IProviderRepository
{
    private readonly AppDbContext _context;

    public ProviderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApplicationUser?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id && u.Role == UserRole.Provider, cancellationToken);
    }

    public async Task<IReadOnlyList<ApplicationUser>> GetActiveProvidersAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .Where(u => u.Role == UserRole.Provider && u.IsActive && !u.IsDeleted)
            .ToListAsync(cancellationToken);
    }

    public async Task<ProviderProfile?> GetProfileByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await _context.ProviderProfiles
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken);
    }

    public async Task AddProfileAsync(ProviderProfile profile, CancellationToken cancellationToken = default)
    {
        await _context.ProviderProfiles.AddAsync(profile, cancellationToken);
    }

    public Task UpdateProfileAsync(ProviderProfile profile, CancellationToken cancellationToken = default)
    {
        _context.ProviderProfiles.Update(profile);
        return Task.CompletedTask;
    }
}
