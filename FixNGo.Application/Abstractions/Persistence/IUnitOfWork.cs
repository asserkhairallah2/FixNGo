using System;
using System.Threading;
using System.Threading.Tasks;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Unit of work contract managing transactional consistency across repositories.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    Task BeginTransactionAsync(CancellationToken cancellationToken = default);
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
}

