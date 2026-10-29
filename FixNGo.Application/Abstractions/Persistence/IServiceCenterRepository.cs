using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Repository contract for retrieving and managing service centers and catalogs.
/// </summary>
public interface IServiceCenterRepository
{
    Task<ServiceCenter?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ServiceCenter>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceCenter> AddAsync(ServiceCenter serviceCenter, CancellationToken cancellationToken = default);
    Task UpdateAsync(ServiceCenter serviceCenter, CancellationToken cancellationToken = default);
    Task DeleteAsync(ServiceCenter serviceCenter, CancellationToken cancellationToken = default);
}

