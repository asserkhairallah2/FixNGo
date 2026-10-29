using System.Threading;
using System.Threading.Tasks;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Persistence abstraction exposing unit-of-work saving behavior for application use cases.
/// </summary>
public interface IAppDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

