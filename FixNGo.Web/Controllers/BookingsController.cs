using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FixNGo.Infrastructure.Persistence;
using FixNGo.Domain.Entities;

namespace FixNGo.Web.Controllers;

public class BookingsController : Controller
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: Bookings/Create?serviceCenterId=1
    [HttpGet]
    public async Task<IActionResult> Create(int serviceCenterId)
    {
        // Retrieve the service center along with its offered services
        var serviceCenter = await _context.ServiceCenters
            .Include(sc => sc.Services)
            .FirstOrDefaultAsync(sc => sc.Id == serviceCenterId);

        if (serviceCenter == null)
        {
            return NotFound();
        }

        // Pass center name and services to the view via ViewBag
        ViewBag.ServiceCenterName = serviceCenter.Name;
        ViewBag.Services = serviceCenter.Services;

        // Initialize a new booking instance with default values
        var booking = new Booking
        {
            ServiceCenterId = serviceCenterId,
            AppointmentDate = DateOnly.FromDateTime(DateTime.Today.AddDays(1))
        };

        return View("~/Views/ServiceCenters/Create.cshtml", booking);
    }

    // POST: Bookings/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Booking booking)
    {
        // Remove navigation properties from ModelState validation to avoid validation errors
        ModelState.Remove(nameof(Booking.ServiceCenter));
        ModelState.Remove(nameof(Booking.Service));
        ModelState.Remove(nameof(Booking.Customer));

        if (ModelState.IsValid)
        {
            // Add the new booking to the database context and save changes
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "ServiceCenters");
        }

        // Reload service center data if model state is invalid
        var serviceCenter = await _context.ServiceCenters
            .Include(sc => sc.Services)
            .FirstOrDefaultAsync(sc => sc.Id == booking.ServiceCenterId);

        ViewBag.ServiceCenterName = serviceCenter?.Name;
        ViewBag.Services = serviceCenter?.Services;

        return View("~/Views/ServiceCenters/Create.cshtml", booking);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // BOOKINGS DASHBOARD  (Service-Center owner view — static / dummy data)
    // ─────────────────────────────────────────────────────────────────────────

    // GET: Bookings/Dashboard
    // Builds a list of 6 hardcoded dummy bookings and passes them to the view.
    public IActionResult Dashboard()
    {
        // Hardcoded dummy bookings — no database call
        var bookings = new System.Collections.Generic.List<FixNGo.Web.Models.BookingItemViewModel>
        {
            new() { Id = 1, CustomerName = "Ahmed Mahmoud",     ServiceName = "Oil Change",          AppointmentDate = "01 Nov 2026", AppointmentTime = "09:00 AM", Price = 350m,  Status = FixNGo.Web.Models.BookingDashboardStatus.Pending  },
            new() { Id = 2, CustomerName = "Youssef El-Sayed",  ServiceName = "Brake Inspection",    AppointmentDate = "01 Nov 2026", AppointmentTime = "10:30 AM", Price = 200m,  Status = FixNGo.Web.Models.BookingDashboardStatus.Accepted },
            new() { Id = 3, CustomerName = "Tarek Ibrahim",     ServiceName = "Full Car Diagnosis",  AppointmentDate = "02 Nov 2026", AppointmentTime = "11:00 AM", Price = 500m,  Status = FixNGo.Web.Models.BookingDashboardStatus.Pending  },
            new() { Id = 4, CustomerName = "Mohamed Hassan",    ServiceName = "Tire Replacement",    AppointmentDate = "02 Nov 2026", AppointmentTime = "01:00 PM", Price = 800m,  Status = FixNGo.Web.Models.BookingDashboardStatus.Accepted },
            new() { Id = 5, CustomerName = "Omar Abdel-Rahman", ServiceName = "AC Repair",           AppointmentDate = "03 Nov 2026", AppointmentTime = "02:30 PM", Price = 650m,  Status = FixNGo.Web.Models.BookingDashboardStatus.Accepted },
            new() { Id = 6, CustomerName = "Khaled Mostafa",    ServiceName = "Battery Replacement", AppointmentDate = "03 Nov 2026", AppointmentTime = "04:00 PM", Price = 450m,  Status = FixNGo.Web.Models.BookingDashboardStatus.Rejected },
        };

        var model = new FixNGo.Web.Models.BookingsDashboardViewModel { Bookings = bookings };
        return View(model);
    }

    // POST: Bookings/Dashboard
    // Receives the booking id and action type ("Accept" or "Reject").
    // Does NOT save anything — only sets a success message and redirects.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Dashboard(int bookingId, string actionType)
    {
        // Build a friendly confirmation message for the owner
        TempData["Success"] = $"Booking #{bookingId} {actionType.ToLower()}ed.";
        return RedirectToAction(nameof(Dashboard));
    }
}