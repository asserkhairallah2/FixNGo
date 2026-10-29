using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;

namespace FixNGo.Application.Abstractions.Persistence;

/// <summary>
/// Repository contract for managing service center appointment bookings.
/// </summary>
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Booking>> GetByCustomerIdAsync(string customerId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Booking>> GetByServiceCenterIdAsync(int serviceCenterId, CancellationToken cancellationToken = default);
    Task<Booking> AddAsync(Booking booking, CancellationToken cancellationToken = default);
    Task UpdateAsync(Booking booking, CancellationToken cancellationToken = default);
}

