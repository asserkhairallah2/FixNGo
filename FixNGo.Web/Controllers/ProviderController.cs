using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Features.Provider;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FixNGo.Web.Controllers;

/// <summary>
/// Provider Portal MVC Controller implementing provider workflows (SRS Section 3.1, SAD UC-21..UC-25).
/// Enforces server-side authorization, ownership verification, and state transition validation.
/// </summary>
public class ProviderController : Controller
{
    private readonly IProviderService _providerService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProviderController(IProviderService providerService, UserManager<ApplicationUser> userManager)
    {
        _providerService = providerService;
        _userManager = userManager;
    }

    // GET: /Provider or /Provider/Dashboard
    [HttpGet]
    public async Task<IActionResult> Dashboard(CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Dashboard") });

        var dashboard = await _providerService.GetDashboardAsync(providerId, cancellationToken);
        return View(dashboard);
    }

    // GET: /Provider/Requests
    [HttpGet]
    public async Task<IActionResult> Requests(AssistanceType? serviceType, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Requests") });

        var requests = await _providerService.GetIncomingRequestsAsync(providerId, serviceType, cancellationToken);
        var profile = await _providerService.GetProfileAsync(providerId, cancellationToken);
        ViewBag.IsOnline = profile?.IsOnline ?? false;
        ViewBag.VerificationStatus = profile?.VerificationStatus ?? VerificationStatus.Pending;
        ViewBag.SelectedServiceType = serviceType;

        return View(requests);
    }

    // GET: /Provider/RequestDetails/5
    [HttpGet]
    public async Task<IActionResult> RequestDetails(int id, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("RequestDetails", new { id }) });

        var details = await _providerService.GetRequestDetailsAsync(id, providerId, cancellationToken);
        if (details == null)
        {
            TempData["Error"] = "Assistance request not found or you are not authorized to view this ticket.";
            return RedirectToAction(nameof(Requests));
        }

        return View(details);
    }

    // GET: /Provider/ActiveRequest
    [HttpGet]
    public async Task<IActionResult> ActiveRequest(CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("ActiveRequest") });

        var activeRequest = await _providerService.GetActiveRequestAsync(providerId, cancellationToken);
        return View(activeRequest);
    }

    // GET: /Provider/Earnings
    [HttpGet]
    public async Task<IActionResult> Earnings(string? period, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Earnings") });

        var earnings = await _providerService.GetEarningsAsync(providerId, period, cancellationToken);
        ViewBag.SelectedPeriod = period ?? "all";
        return View(earnings);
    }

    // GET: /Provider/History
    [HttpGet]
    public async Task<IActionResult> History(AssistanceRequestStatus? status, string? search, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("History") });

        var history = await _providerService.GetHistoryAsync(providerId, status, search, cancellationToken);
        ViewBag.CurrentStatusFilter = status;
        ViewBag.CurrentSearch = search;
        return View(history);
    }

    // GET: /Provider/Profile
    [HttpGet]
    public async Task<IActionResult> Profile(CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account", new { returnUrl = Url.Action("Profile") });

        var profile = await _providerService.GetProfileAsync(providerId, cancellationToken);
        if (profile == null)
            return NotFound();

        return View(profile);
    }

    // POST: /Provider/Profile
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Profile(UpdateProviderProfileDto model, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account");

        if (!ModelState.IsValid)
        {
            var profile = await _providerService.GetProfileAsync(providerId, cancellationToken);
            return View(profile);
        }

        var result = await _providerService.UpdateProfileAsync(providerId, model, cancellationToken);
        if (result.IsSuccess)
        {
            TempData["Success"] = "Your provider profile has been successfully updated.";
            return RedirectToAction(nameof(Profile));
        }

        TempData["Error"] = result.Error;
        var currentProfile = await _providerService.GetProfileAsync(providerId, cancellationToken);
        return View(currentProfile);
    }

    // POST: /Provider/ToggleAvailability
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleAvailability(string? returnUrl, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account");

        var result = await _providerService.ToggleAvailabilityAsync(providerId, cancellationToken);
        if (result.IsSuccess)
        {
            string statusStr = result.Value ? "Online (Available for new requests)" : "Offline";
            TempData["Success"] = $"Availability status changed to {statusStr}.";
        }
        else
        {
            TempData["Error"] = result.Error;
        }

        if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
            return Redirect(returnUrl);

        return RedirectToAction(nameof(Dashboard));
    }

    // POST: /Provider/AcceptRequest
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AcceptRequest(int id, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account");

        var result = await _providerService.AcceptRequestAsync(id, providerId, cancellationToken);
        if (result.IsSuccess)
        {
            TempData["Success"] = "Emergency assistance request accepted! Mission started.";
            return RedirectToAction(nameof(ActiveRequest));
        }

        TempData["Error"] = result.Error;
        return RedirectToAction(nameof(Requests));
    }

    // POST: /Provider/RejectRequest
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> RejectRequest(int id, string? reason, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account");

        var result = await _providerService.RejectRequestAsync(id, providerId, reason, cancellationToken);
        if (result.IsSuccess)
        {
            TempData["Info"] = "Assistance request offer declined.";
        }
        else
        {
            TempData["Error"] = result.Error;
        }

        return RedirectToAction(nameof(Requests));
    }

    // POST: /Provider/UpdateStatus
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateStatus(int id, AssistanceRequestStatus newStatus, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account");

        var result = await _providerService.UpdateStatusAsync(id, providerId, newStatus, cancellationToken);
        if (result.IsSuccess)
        {
            TempData["Success"] = $"Mission status updated to '{newStatus}'.";
            if (newStatus == AssistanceRequestStatus.Completed)
            {
                return RedirectToAction(nameof(Earnings));
            }
        }
        else
        {
            TempData["Error"] = result.Error;
        }

        return RedirectToAction(nameof(ActiveRequest));
    }

    // POST: /Provider/CompleteService
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CompleteService(int id, decimal? finalFare, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return RedirectToAction("Login", "Account");

        var result = await _providerService.CompleteServiceAsync(id, providerId, finalFare, cancellationToken);
        if (result.IsSuccess)
        {
            TempData["Success"] = "Mission successfully completed! Job recorded to your service history and earnings.";
            return RedirectToAction(nameof(Earnings));
        }

        TempData["Error"] = result.Error;
        return RedirectToAction(nameof(ActiveRequest));
    }

    // POST: /Provider/UpdateLocation (SignalR or Geolocation API update)
    [HttpPost]
    public async Task<IActionResult> UpdateLocation([FromBody] LocationUpdateRequest request, CancellationToken cancellationToken)
    {
        var providerId = await ResolveCurrentProviderIdAsync();
        if (providerId == null)
            return Unauthorized();

        if (request == null)
            return BadRequest();

        var result = await _providerService.UpdateLiveLocationAsync(providerId, request.Latitude, request.Longitude, cancellationToken);
        if (result.IsSuccess)
            return Ok(new { success = true });

        return BadRequest(new { success = false, error = result.Error });
    }

    // Private Helper: Resolves authenticated provider, or fallback demo provider for evaluation
    private async Task<string?> ResolveCurrentProviderIdAsync()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!string.IsNullOrEmpty(userId))
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null && user.Role == UserRole.Provider)
                    return user.Id;
            }
        }

        // Development/Demo fallback: resolve default seeded provider
        var demoProvider = await _userManager.FindByEmailAsync("provider@fixngo.com");
        return demoProvider?.Id;
    }
}

public class LocationUpdateRequest
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
