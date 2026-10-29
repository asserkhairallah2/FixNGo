using System;
using System.Collections.Generic;
using System.Threading;
using FixNGo.Web.Models;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace FixNGo.Web.Controllers;

/// <summary>
/// Sample MVC Controller demonstrating full server-rendered Razor UI alongside domain repositories.
/// </summary>
public class ServiceCentersController : Controller
{
    private readonly IServiceCenterRepository _serviceCenterRepository;

    public ServiceCentersController(IServiceCenterRepository serviceCenterRepository)
    {
        _serviceCenterRepository = serviceCenterRepository;
    }

    // GET: /ServiceCenters
    public async Task<IActionResult> Index(CancellationToken cancellationToken)
    {
        var centers = await _serviceCenterRepository.GetAllAsync(cancellationToken);
        return View(centers);
    }

    // GET: /ServiceCenters/Details/5
    public async Task<IActionResult> Details(int id, CancellationToken cancellationToken)
    {
        var center = await _serviceCenterRepository.GetByIdAsync(id, cancellationToken);
        if (center == null)
        {
            return NotFound();
        }

        return View(center);
    }
    // GET: /ServiceCenters/WorkingHours/5
    [HttpGet]
    public async Task<IActionResult> WorkingHours(int id, CancellationToken cancellationToken)
    {
        var center = await _serviceCenterRepository.GetByIdAsync(id, cancellationToken);
        if (center == null)
        {
            return NotFound();
        }

        return View(center.WorkingHours); 
    }
    // POST: /ServiceCenters/WorkingHours
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> WorkingHours(int id, List<FixNGo.Domain.Entities.WorkingHours> workingHours, CancellationToken cancellationToken)
    {
  
        TempData["Success"] = "Business hours have been successfully updated.!";
        return RedirectToAction(nameof(Details), new { id = id });
    }

    // GET: /ServiceCenters/VerificationDocuments/1
    [HttpGet]
    public IActionResult VerificationDocuments(int id = 1)
    {
        // Static mock data for Egyptian compliance and verification documents
        var model = new VerificationDocumentsViewModel
        {
            CenterId = id,
            CenterName = "Al-Nasr Certified Service Center",
            Documents = new List<VerificationDocumentItem>
            {
                new()
                {
                    Id = 1,
                    DocumentType = "CommercialRegister",
                    TitleEn = "Commercial Register",
                    TitleAr = string.Empty,
                    FileName = "commercial_register_2025.pdf",
                    FileSize = "2.4 MB",
                    UploadedAt = DateTime.UtcNow.AddMonths(-3),
                    Status = DocumentStatus.Approved,
                    RejectionReason = null
                },
                new()
                {
                    Id = 2,
                    DocumentType = "TaxCard",
                    TitleEn = "Tax Card",
                    TitleAr = string.Empty,
                    FileName = "tax_card_scan.pdf",
                    FileSize = "1.1 MB",
                    UploadedAt = DateTime.UtcNow.AddDays(-2),
                    Status = DocumentStatus.Pending,
                    RejectionReason = null
                },
                new()
                {
                    Id = 3,
                    DocumentType = "ShopOperatingLicense",
                    TitleEn = "Shop Operating License",
                    TitleAr = string.Empty,
                    FileName = "shop_license_2025.pdf",
                    FileSize = "3.8 MB",
                    UploadedAt = DateTime.UtcNow.AddDays(-5),
                    Status = DocumentStatus.Rejected,
                    RejectionReason = "The uploaded copy has expired on 31/12/2025. Please upload a renewed valid license bearing the local district stamp."
                },
                new()
                {
                    Id = 4,
                    DocumentType = "OwnerNationalId",
                    TitleEn = "Owner National ID",
                    TitleAr = string.Empty,
                    FileName = "owner_national_id_front_back.jpg",
                    FileSize = "850 KB",
                    UploadedAt = DateTime.UtcNow.AddMonths(-2),
                    Status = DocumentStatus.Approved,
                    RejectionReason = null
                }
            }
        };

        return View(model);
    }

    // POST: /ServiceCenters/VerificationDocuments
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult VerificationDocuments(int id, VerificationDocumentsViewModel input)
    {
        // Static simulation: do not save or upload, set success notification and redirect back
        TempData["Success"] = "Document uploaded successfully and queued for administrative review.";
        return RedirectToAction(nameof(VerificationDocuments), new { id = id });
    }

    // GET: /ServiceCenters/Services/1
    [HttpGet]
    public IActionResult Services(int id = 1)
    {
        // Static mock data for center repair and maintenance services
        var model = new CenterServicesViewModel
        {
            CenterId = id,
            CenterName = "Al-Nasr Certified Service Center",
            Services = new List<ServiceItemViewModel>
            {
                new()
                {
                    Id = 1,
                    Name = "Oil Change",
                    Description = "Full synthetic engine oil replacement including high-performance oil filter.",
                    Price = 650,
                    IsAvailable = true,
                    Offer = "15% OFF"
                },
                new()
                {
                    Id = 2,
                    Name = "Brake Inspection",
                    Description = "Comprehensive checkup of brake pads, rotors, drums, and hydraulic fluid levels.",
                    Price = 250,
                    IsAvailable = true,
                    Offer = null
                },
                new()
                {
                    Id = 3,
                    Name = "Tire Replacement",
                    Description = "Professional tire mounting, wheel balancing, and tire pressure adjustment.",
                    Price = 400,
                    IsAvailable = true,
                    Offer = "20% OFF"
                },
                new()
                {
                    Id = 4,
                    Name = "Battery Replacement",
                    Description = "Automotive 12V battery test and installation with terminal cleaning.",
                    Price = 350,
                    IsAvailable = false,
                    Offer = null
                },
                new()
                {
                    Id = 5,
                    Name = "Full Car Diagnosis",
                    Description = "Complete OBD-II computerized electronic diagnostic scan and safety inspection.",
                    Price = 800,
                    IsAvailable = true,
                    Offer = "100 EGP OFF"
                },
                new()
                {
                    Id = 6,
                    Name = "AC Repair",
                    Description = "Air conditioning gas refill, leak inspection, and compressor performance tuning.",
                    Price = 950,
                    IsAvailable = true,
                    Offer = null
                }
            }
        };

        return View(model);
    }

    // POST: /ServiceCenters/Services
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Services(int id, CenterServicesViewModel input)
    {
        // Static simulation: do not save anything, set success notification and redirect back
        TempData["Success"] = "Service added successfully.";
        return RedirectToAction(nameof(Services), new { id = id });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SERVICE CENTER PROFILE (Service-Center owner view — static / dummy data)
    // ─────────────────────────────────────────────────────────────────────────

    // GET: /ServiceCenters/Profile
    public IActionResult Profile(int id = 1)
    {
        // Static dummy data for the center profile
        var model = new CenterProfileViewModel
        {
            Id = id,
            Name = "Al-Nasr Certified Service Center",
            Phone = "+20 100 123 4567",
            Email = "contact@alnasr-auto.com",
            Address = "Nasr City, Cairo, Egypt",
            Latitude = 30.0561,
            Longitude = 31.3300,
            IsActive = true,
            IsVerified = true
        };

        return View(model);
    }

    // POST: /ServiceCenters/Profile
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Profile(CenterProfileViewModel model)
    {
        // Static simulation: do not check ModelState, do not save anything
        TempData["Success"] = "Profile updated successfully.";
        return RedirectToAction(nameof(Profile), new { id = model.Id });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SERVICE CENTER DASHBOARD HUB (Main management hub for service center)
    // ─────────────────────────────────────────────────────────────────────────

    // GET: /ServiceCenters/Dashboard
    public IActionResult Dashboard()
    {
        return View();
    }
}