using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;

namespace FixNGo.Infrastructure.Persistence.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly AppDbContext _context;

    public VehicleRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<object?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return Task.FromResult<object?>(null);
    }
}

