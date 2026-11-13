using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using FixNGo.Infrastructure.Persistence;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Web.Models;

namespace FixNGo.Web.Controllers;

public class BookingsController : Controller
{
    private readonly AppDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public BookingsController(AppDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    // GET: Bookings/Create?serviceCenterId=1&serviceId=2
    [HttpGet]
    public async Task<IActionResult> Create(int serviceCenterId, int? serviceId)
    {
        var serviceCenter = await _context.ServiceCenters
            .Include(sc => sc.Services)
            .FirstOrDefaultAsync(sc => sc.Id == serviceCenterId);

        if (serviceCenter == null)
        {
            return NotFound("Service Center not found.");
        }

        ViewBag.ServiceCenterName = serviceCenter.Name;
        ViewBag.Services = serviceCenter.Services.Where(s => s.IsActive).ToList();

        var selectedService = serviceId.HasValue 
            ? serviceCenter.Services.FirstOrDefault(s => s.Id == serviceId.Value) 
            : serviceCenter.Services.FirstOrDefault(s => s.IsActive);

        var currentUser = await _userManager.GetUserAsync(User);
        string customerId = currentUser?.Id ?? "cust-1";

        var booking = new Booking
        {
            ServiceCenterId = serviceCenterId,
            ServiceId = selectedService?.Id ?? 0,
            Price = selectedService?.Price ?? 0m,
            CustomerId = customerId,
            AppointmentDate = DateOnly.FromDateTime(DateTime.Today.AddDays(1)),
            AppointmentTime = new TimeSpan(10, 0, 0)
        };

        return View(booking);
    }

    // POST: Bookings/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Booking booking)
    {
        ModelState.Remove(nameof(Booking.ServiceCenter));
        ModelState.Remove(nameof(Booking.Service));
        ModelState.Remove(nameof(Booking.Customer));

        if (string.IsNullOrWhiteSpace(booking.CustomerId))
        {
            var currentUser = await _userManager.GetUserAsync(User);
            booking.CustomerId = currentUser?.Id ?? "cust-1";
        }

        if (booking.AppointmentDate < DateOnly.FromDateTime(DateTime.Today))
        {
            ModelState.AddModelError(nameof(Booking.AppointmentDate), "Appointment date cannot be in the past.");
        }

        if (booking.Price <= 0)
        {
            ModelState.AddModelError(nameof(Booking.Price), "Price must be greater than 0 EGP.");
        }

        if (ModelState.IsValid)
        {
            booking.Status = BookingStatus.Pending;
            booking.CreatedAt = DateTime.UtcNow;

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Booking #{booking.Id} has been successfully created and sent to the service center!";
            return RedirectToAction(nameof(Dashboard));
        }

        var serviceCenter = await _context.ServiceCenters
            .Include(sc => sc.Services)
            .FirstOrDefaultAsync(sc => sc.Id == booking.ServiceCenterId);

        ViewBag.ServiceCenterName = serviceCenter?.Name;
        ViewBag.Services = serviceCenter?.Services;

        return View(booking);
    }

    // GET: Bookings/Dashboard
    [HttpGet]
    public async Task<IActionResult> Dashboard(BookingStatus? status, string? search, int pageNumber = 1, int pageSize = 10)
    {
        var query = _context.Bookings
            .Include(b => b.ServiceCenter)
            .Include(b => b.Service)
            .Include(b => b.Customer)
            .AsNoTracking()
            .AsQueryable();

        // Status Counts
        var allList = await _context.Bookings.AsNoTracking().ToListAsync();
        var pendingCount = allList.Count(b => b.Status == BookingStatus.Pending);
        var acceptedCount = allList.Count(b => b.Status == BookingStatus.Confirmed || b.Status == BookingStatus.Completed);
        var rejectedCount = allList.Count(b => b.Status == BookingStatus.Rejected || b.Status == BookingStatus.Cancelled);

        // Filter by Status
        if (status.HasValue)
        {
            query = query.Where(b => b.Status == status.Value);
        }

        // Search Filter
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(b => (b.Customer != null && b.Customer.FullName.ToLower().Contains(s))
                                  || (b.Customer != null && b.Customer.PhoneNumber != null && b.Customer.PhoneNumber.Contains(s))
                                  || (b.ServiceCenter != null && b.ServiceCenter.Name.ToLower().Contains(s))
                                  || (b.Service != null && b.Service.Name.ToLower().Contains(s))
                                  || (b.Notes != null && b.Notes.ToLower().Contains(s)));
        }

        var totalCount = await query.CountAsync();
        if (pageNumber < 1) pageNumber = 1;

        var dbBookings = await query
            .OrderByDescending(b => b.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var bookingItems = dbBookings.Select(b => new BookingItemViewModel
        {
            Id = b.Id,
            CustomerName = b.Customer?.FullName ?? (string.IsNullOrEmpty(b.CustomerId) ? "Valued Client" : b.CustomerId),
            ServiceName = b.Service?.Name ?? "General Vehicle Maintenance",
            ServiceCenterName = b.ServiceCenter?.Name ?? "FixNGo Center",
            AppointmentDate = b.AppointmentDate.ToString("dd MMM yyyy"),
            AppointmentTime = b.AppointmentTime.ToString(@"hh\:mm"),
            Price = b.Price,
            RawStatus = b.Status,
            Notes = b.Notes,
            Status = b.Status switch
            {
                BookingStatus.Pending => BookingDashboardStatus.Pending,
                BookingStatus.Confirmed => BookingDashboardStatus.Accepted,
                BookingStatus.Completed => BookingDashboardStatus.Accepted,
                BookingStatus.Rejected => BookingDashboardStatus.Rejected,
                BookingStatus.Cancelled => BookingDashboardStatus.Rejected,
                _ => BookingDashboardStatus.Pending
            }
        }).ToList();

        var model = new BookingsDashboardViewModel
        {
            Bookings = bookingItems,
            CurrentStatus = status,
            CurrentSearch = search,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
            PendingCount = pendingCount,
            AcceptedCount = acceptedCount,
            RejectedCount = rejectedCount
        };

        return View(model);
    }

    // POST: Bookings/Dashboard or Bookings/UpdateStatus
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Dashboard(int bookingId, string actionType)
    {
        var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);
        if (booking == null)
        {
            return NotFound("Booking not found.");
        }

        switch (actionType?.ToLowerInvariant())
        {
            case "accept":
            case "confirm":
                booking.Confirm();
                TempData["Success"] = $"Booking #{bookingId} has been confirmed successfully.";
                break;

            case "reject":
                booking.Reject("Rejected by service center due to slot unavailability.");
                TempData["Success"] = $"Booking #{bookingId} has been rejected.";
                break;

            case "complete":
                booking.Complete();
                TempData["Success"] = $"Booking #{bookingId} has been marked as Completed.";
                break;

            case "cancel":
                booking.Cancel("Cancelled upon customer request.");
                TempData["Success"] = $"Booking #{bookingId} has been cancelled.";
                break;

            default:
                TempData["Error"] = "Unknown booking action.";
                break;
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Dashboard));
    }
}
