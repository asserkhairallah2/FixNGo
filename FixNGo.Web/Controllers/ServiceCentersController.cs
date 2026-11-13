using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Application.Common.Mappings;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Infrastructure.Persistence;
using FixNGo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Web.Controllers;

/// <summary>
/// Controller for managing Service Centers, service catalogs, business hours, and customer center directory.
/// </summary>
public class ServiceCentersController : Controller
{
    private readonly IServiceCenterRepository _serviceCenterRepository;
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ServiceCentersController(
        IServiceCenterRepository serviceCenterRepository,
        AppDbContext context,
        IMapper mapper)
    {
        _serviceCenterRepository = serviceCenterRepository;
        _context = context;
        _mapper = mapper;
    }

    // GET: /ServiceCenters
    // Displays service centers directory with Search, Filter by City, Sorting, and Pagination.
    [HttpGet]
    public async Task<IActionResult> Index(
        string? search, 
        string? city, 
        string? sortOrder, 
        int pageNumber = 1, 
        int pageSize = 6, 
        CancellationToken cancellationToken = default)
    {
        var centers = await _serviceCenterRepository.GetAllAsync(cancellationToken);
        var query = centers.AsQueryable();

        // 1. Search / Filter
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLowerInvariant();
            query = query.Where(c => (c.Name != null && c.Name.ToLower().Contains(s))
                                  || (c.Address != null && c.Address.ToLower().Contains(s))
                                  || c.Services.Any(sv => sv.Name != null && sv.Name.ToLower().Contains(s)));
        }

        if (!string.IsNullOrWhiteSpace(city))
        {
            var cLower = city.Trim().ToLowerInvariant();
            query = query.Where(c => c.Address != null && c.Address.ToLower().Contains(cLower));
        }

        // 2. Sort
        query = sortOrder switch
        {
            "name_desc" => query.OrderByDescending(c => c.Name),
            "rating_desc" => query.OrderByDescending(c => c.Rating).ThenByDescending(c => c.TotalReviews),
            "rating_asc" => query.OrderBy(c => c.Rating),
            _ => query.OrderBy(c => c.Name) // default name_asc
        };

        // 3. Pagination
        if (pageNumber < 1) pageNumber = 1;
        var totalCount = query.Count();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        var items = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        // 4. AutoMapper DTO projection
        var dtos = _mapper.Map<List<ServiceCenterDto>>(items);

        var viewModel = new ServiceCenterIndexViewModel
        {
            Items = dtos,
            Search = search,
            City = city,
            SortOrder = sortOrder,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = totalPages,
            AvailableCities = new List<string> { "Cairo", "Giza", "Alexandria", "6th of October" }
        };

        return View(viewModel);
    }

    // GET: /ServiceCenters/Details/5
    public async Task<IActionResult> Details(int id, CancellationToken cancellationToken)
    {
        var center = await _serviceCenterRepository.GetByIdAsync(id, cancellationToken);
        if (center == null)
        {
            return NotFound("Service center not found.");
        }

        return View(center);
    }

    // GET: /ServiceCenters/WorkingHours/5
    [HttpGet]
    public async Task<IActionResult> WorkingHours(int id, CancellationToken cancellationToken)
    {
        var center = await _serviceCenterRepository.GetByIdAsync(id, cancellationToken);

        if (center == null || !center.WorkingHours.Any())
        {
            var blank = Enum.GetValues<DayOfWeek>()
                .Select(day => new WorkingHours
                {
                    ServiceCenterId = id,
                    DayOfWeek = day,
                    OpenTime = TimeSpan.FromHours(8),
                    CloseTime = TimeSpan.FromHours(18),
                    IsClosed = (day == DayOfWeek.Friday)
                }).ToList();
            return View(blank);
        }

        return View(center.WorkingHours.OrderBy(w => w.DayOfWeek).ToList());
    }

    // POST: /ServiceCenters/WorkingHours
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> WorkingHours(int id, List<WorkingHours> workingHours, CancellationToken cancellationToken)
    {
        var center = await _serviceCenterRepository.GetByIdAsync(id, cancellationToken);
        if (center != null && workingHours != null)
        {
            foreach (var item in workingHours)
            {
                var existing = center.WorkingHours.FirstOrDefault(w => w.DayOfWeek == item.DayOfWeek);
                if (existing != null)
                {
                    existing.OpenTime = item.OpenTime;
                    existing.CloseTime = item.CloseTime;
                    existing.IsClosed = item.IsClosed;
                    existing.UpdatedAt = DateTime.UtcNow;
                }
                else
                {
                    item.ServiceCenterId = id;
                    item.CreatedAt = DateTime.UtcNow;
                    _context.WorkingHours.Add(item);
                }
            }
            await _context.SaveChangesAsync(cancellationToken);
        }

        TempData["Success"] = "Business hours have been successfully updated!";
        return RedirectToAction(nameof(Details), new { id = id });
    }

    // GET: /ServiceCenters/VerificationDocuments/1
    [HttpGet]
    public async Task<IActionResult> VerificationDocuments(int id = 1)
    {
        var center = await _context.ServiceCenters.FirstOrDefaultAsync(sc => sc.Id == id);
        string centerName = center?.Name ?? "FixNGo Certified Center";

        var model = new VerificationDocumentsViewModel
        {
            CenterId = id,
            CenterName = centerName,
            Documents = new List<VerificationDocumentItem>
            {
                new()
                {
                    Id = 1,
                    DocumentType = "CommercialRegister",
                    TitleEn = "Commercial Register (السجل التجاري)",
                    FileName = "commercial_register_cairo.pdf",
                    FileSize = "2.4 MB",
                    UploadedAt = DateTime.UtcNow.AddMonths(-3),
                    Status = center?.VerificationStatus == VerificationStatus.Verified ? DocumentStatus.Approved : DocumentStatus.Pending
                },
                new()
                {
                    Id = 2,
                    DocumentType = "TaxCard",
                    TitleEn = "Tax Card (البطاقة الضريبية)",
                    FileName = "tax_card_scan.pdf",
                    FileSize = "1.1 MB",
                    UploadedAt = DateTime.UtcNow.AddDays(-2),
                    Status = center?.VerificationStatus == VerificationStatus.Verified ? DocumentStatus.Approved : DocumentStatus.Pending
                }
            }
        };

        return View(model);
    }

    // POST: /ServiceCenters/VerificationDocuments
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> VerificationDocuments(int id, VerificationDocumentsViewModel input)
    {
        var center = await _context.ServiceCenters.FirstOrDefaultAsync(sc => sc.Id == id);
        if (center != null)
        {
            center.VerificationStatus = VerificationStatus.Verified;
            center.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        TempData["Success"] = "Verification documents uploaded and successfully processed.";
        return RedirectToAction(nameof(VerificationDocuments), new { id = id });
    }

    // GET: /ServiceCenters/Services/1
    [HttpGet]
    public async Task<IActionResult> Services(int id = 1)
    {
        var center = await _context.ServiceCenters
            .Include(sc => sc.Services)
            .FirstOrDefaultAsync(sc => sc.Id == id);

        var serviceList = (center?.Services ?? new List<Service>())
            .Select(s => new ServiceItemViewModel
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description ?? string.Empty,
                Price = s.Price,
                IsAvailable = s.IsActive,
                Offer = null
            }).ToList();

        var model = new CenterServicesViewModel
        {
            CenterId = id,
            CenterName = center?.Name ?? "FixNGo Service Center",
            Services = serviceList,
            NewService = new AddServiceInputModel { IsAvailable = true }
        };

        return View(model);
    }

    // POST: /ServiceCenters/Services
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Services(int id, CenterServicesViewModel input)
    {
        if (input.NewService != null && !string.IsNullOrWhiteSpace(input.NewService.Name) && input.NewService.Price > 0)
        {
            var newEntity = new Service
            {
                ServiceCenterId = id,
                Name = input.NewService.Name.Trim(),
                Price = input.NewService.Price,
                Description = input.NewService.Description,
                IsActive = input.NewService.IsAvailable,
                EstimatedDurationMinutes = 60,
                CreatedAt = DateTime.UtcNow
            };

            _context.Services.Add(newEntity);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Service '{newEntity.Name}' added to center catalog successfully!";
        }
        else
        {
            TempData["Error"] = "Please provide valid service name and price.";
        }

        return RedirectToAction(nameof(Services), new { id = id });
    }

    // GET: /ServiceCenters/Profile
    [HttpGet]
    public async Task<IActionResult> Profile(int id = 1)
    {
        var center = await _context.ServiceCenters.FirstOrDefaultAsync(sc => sc.Id == id);
        if (center == null)
        {
            return NotFound("Center profile not found.");
        }

        var model = new CenterProfileViewModel
        {
            Id = center.Id,
            Name = center.Name,
            Phone = center.Phone,
            Email = "contact@fixngo.eg",
            Address = center.Address,
            Latitude = center.Latitude,
            Longitude = center.Longitude,
            IsActive = center.IsActive,
            IsVerified = center.VerificationStatus == VerificationStatus.Verified
        };

        return View(model);
    }

    // POST: /ServiceCenters/Profile
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Profile(CenterProfileViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var center = await _context.ServiceCenters.FirstOrDefaultAsync(sc => sc.Id == model.Id);
        if (center != null)
        {
            center.Name = model.Name.Trim();
            center.Phone = model.Phone.Trim();
            center.Address = model.Address.Trim();
            center.Latitude = model.Latitude;
            center.Longitude = model.Longitude;
            center.IsActive = model.IsActive;
            center.VerificationStatus = model.IsVerified ? VerificationStatus.Verified : VerificationStatus.Pending;
            center.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            TempData["Success"] = "Center profile updated successfully in the system database!";
        }

        return RedirectToAction(nameof(Profile), new { id = model.Id });
    }

    // GET: /ServiceCenters/Dashboard
    public IActionResult Dashboard()
    {
        return View();
    }
}
