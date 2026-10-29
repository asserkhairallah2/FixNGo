using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Infrastructure.Persistence.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _context;

    public BookingRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Booking?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Bookings
            .Include(b => b.ServiceCenter)
            .Include(b => b.Service)
            .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Booking>> GetByCustomerIdAsync(string customerId, CancellationToken cancellationToken = default)
    {
        return await _context.Bookings
            .Include(b => b.ServiceCenter)
            .Include(b => b.Service)
            .Where(b => b.CustomerId == customerId)
            .OrderByDescending(b => b.AppointmentDate)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Booking>> GetByServiceCenterIdAsync(int serviceCenterId, CancellationToken cancellationToken = default)
    {
        return await _context.Bookings
            .Include(b => b.Service)
            .Include(b => b.Customer)
            .Where(b => b.ServiceCenterId == serviceCenterId)
            .OrderByDescending(b => b.AppointmentDate)
            .ToListAsync(cancellationToken);
    }

    public async Task<Booking> AddAsync(Booking booking, CancellationToken cancellationToken = default)
    {
        await _context.Bookings.AddAsync(booking, cancellationToken);
        return booking;
    }

    public Task UpdateAsync(Booking booking, CancellationToken cancellationToken = default)
    {
        _context.Bookings.Update(booking);
        return Task.CompletedTask;
    }
}

