using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Features.Provider;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Web.Controllers.Api;

[ApiController]
[Route("api/assistance-requests")]
[Produces("application/json")]
public class AssistanceRequestsApiController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IProviderService _providerService;

    public AssistanceRequestsApiController(AppDbContext context, IProviderService providerService)
    {
        _context = context;
        _providerService = providerService;
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveRequest(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(userId))
        {
            var active = await _providerService.GetActiveRequestAsync(userId, cancellationToken);
            if (active != null) return Ok(active);
        }

        // Return first in-progress or open request for prototype/demo live tracking
        var req = await _context.AssistanceRequests
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Status == AssistanceRequestStatus.EnRoute || 
                                     r.Status == AssistanceRequestStatus.Accepted || 
                                     r.Status == AssistanceRequestStatus.InService, cancellationToken);

        if (req == null)
            return NotFound(new { message = "No active emergency trip found." });

        return Ok(new
        {
            requestId = req.Id,
            status = req.Status.ToString(),
            customerName = req.CustomerName,
            customerPhone = req.CustomerPhone,
            serviceType = req.ServiceType.ToString(),
            customerLatitude = req.CustomerLatitude,
            customerLongitude = req.CustomerLongitude,
            providerLatitude = req.ProviderLatitude ?? (req.CustomerLatitude + 0.015),
            providerLongitude = req.ProviderLongitude ?? (req.CustomerLongitude + 0.012),
            vehicleInfo = req.VehicleInfo,
            estimatedFare = req.EstimatedFare
        });
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var req = await _context.AssistanceRequests
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);

        if (req == null) return NotFound(new { message = $"Request #{id} not found." });

        return Ok(req);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAssistanceRequestDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "guest_client";
        var entity = new AssistanceRequest
        {
            CustomerId = userId,
            CustomerName = dto.CustomerName ?? "Emergency Driver",
            CustomerPhone = dto.CustomerPhone ?? "01000000000",
            ServiceType = dto.ServiceType,
            ProblemDescription = dto.ProblemDescription,
            CustomerLatitude = dto.Latitude,
            CustomerLongitude = dto.Longitude,
            CustomerAddress = dto.Address,
            VehicleInfo = dto.VehicleInfo,
            VehiclePlateNumber = dto.VehiclePlateNumber,
            EstimatedFare = dto.EstimatedFare > 0 ? dto.EstimatedFare : 350m,
            Status = AssistanceRequestStatus.Open,
            CreatedAt = DateTime.UtcNow
        };

        _context.AssistanceRequests.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
    }

    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto, CancellationToken cancellationToken)
    {
        var req = await _context.AssistanceRequests.FindAsync(new object[] { id }, cancellationToken);
        if (req == null) return NotFound(new { message = $"Request #{id} not found." });

        if (Enum.TryParse<AssistanceRequestStatus>(dto.Status, true, out var newStatus))
        {
            req.Status = newStatus;
            req.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(cancellationToken);
            return Ok(new { success = true, newStatus = req.Status.ToString() });
        }

        return BadRequest(new { message = "Invalid status value." });
    }

    [HttpPost("{id:int}/location")]
    public async Task<IActionResult> UpdateLocation(int id, [FromBody] UpdateLocationDto dto, CancellationToken cancellationToken)
    {
        var req = await _context.AssistanceRequests.FindAsync(new object[] { id }, cancellationToken);
        if (req == null) return NotFound(new { message = $"Request #{id} not found." });

        req.UpdateProviderLocation(dto.Latitude, dto.Longitude);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new { success = true, latitude = dto.Latitude, longitude = dto.Longitude });
    }
}

public class CreateAssistanceRequestDto
{
    public string? CustomerName { get; set; }
    public string? CustomerPhone { get; set; }
    public AssistanceType ServiceType { get; set; } = AssistanceType.Mechanic;
    public string? ProblemDescription { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Address { get; set; }
    public string? VehicleInfo { get; set; }
    public string? VehiclePlateNumber { get; set; }
    public decimal EstimatedFare { get; set; }
}

public class UpdateStatusDto
{
    public string Status { get; set; } = string.Empty;
}

public class UpdateLocationDto
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
