using System.Threading;
using System.Threading.Tasks;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Repository contract for customer vehicle profiles.
/// </summary>
public interface IVehicleRepository
{
    Task<object?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
}

