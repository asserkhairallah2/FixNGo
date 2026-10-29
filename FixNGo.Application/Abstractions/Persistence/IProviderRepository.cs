using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Repository contract for retrieving and managing roadside service providers.
/// </summary>
public interface IProviderRepository
{
    Task<ApplicationUser?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ApplicationUser>> GetActiveProvidersAsync(CancellationToken cancellationToken = default);
    Task<ProviderProfile?> GetProfileByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    Task AddProfileAsync(ProviderProfile profile, CancellationToken cancellationToken = default);
    Task UpdateProfileAsync(ProviderProfile profile, CancellationToken cancellationToken = default);
}
