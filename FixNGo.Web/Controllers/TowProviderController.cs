using System;
using System.Collections.Generic;
using System.Linq;
using FixNGo.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FixNGo.Web.Controllers;

public class TowProviderController : Controller
{
    #region In-Memory Store (Simulated Database State for Demo)

    private static bool _isOnline = true;

    private static TowProviderProfileViewModel _profile = new()
    {
        FullName = "Shaaban Sayed",
        PhoneNumber = "+20 101 234 5678",
        Email = "shaaban.tow@fixngo.eg",
        City = "Giza - 6th of October Corridor",
        TruckType = "Hydraulic Flatbed Tow Truck (ونش مسطح هيدروليك)",
        TruckMakeModel = "Isuzu NPR 71 - 2024",
        TruckPlateNumber = "ج ي ز - 4892",
        MaxLoadCapacityTons = 5.0,
        SupportedVehicleTypes = "Sedans, SUVs, 4x4, Light Commercial Vans",
        VerificationStatus = "VERIFIED",
        Documents = new List<TowDocumentItemViewModel>
        {
            new() { DocumentTitle = "National ID Card", FileName = "National_ID_Shaaban.pdf", UploadedAt = DateTime.Now.AddDays(-20), Status = "Approved" },
            new() { DocumentTitle = "Professional Driving License", FileName = "Pro_License_Grade2.pdf", UploadedAt = DateTime.Now.AddDays(-20), Status = "Approved" },
            new() { DocumentTitle = "Tow Truck Registration & Capacity Cert", FileName = "Isuzu_Flatbed_Reg.pdf", UploadedAt = DateTime.Now.AddDays(-19), Status = "Approved" }
        }
    };

    private static List<TowRequestItemViewModel> _requests = new()
    {
        new TowRequestItemViewModel
        {
            Id = 101,
            RequestCode = "TOW-8841",
            CustomerName = "Ahmed Hassan",
            CustomerPhone = "+20 109 876 5432",
            VehicleMakeModel = "Hyundai Tucson",
            VehicleYear = 2023,
            VehiclePlate = "أ ب ج - 1254",
            ProblemType = "Accident / Front Axle Damage (Non-movable)",
            IsVehicleMovable = false,
            IsEmergencyP0 = true,
            TowTypeRequired = "Hydraulic Flatbed (ونش مسطح كامل)",
            PickupAddress = "26th of July Corridor, Near Hyper One, Sheikh Zayed",
            PickupLat = 30.0385,
            PickupLng = 31.0118,
            DestinationAddress = "El-Safwa Auto Service Center, Industrial Zone, 6th of October",
            DestinationLat = 29.9381,
            DestinationLng = 30.9135,
            DistanceToPickupKm = 3.2,
            TowingDistanceKm = 14.5,
            EstimatedEtaMinutes = 8,
            EstimatedPrice = 650m,
            PaymentMethod = "Online (Card)",
            AdditionalNotes = "The front right wheel is locked. Needs a flatbed winch cable to pull it up.",
            RequestedAt = DateTime.Now.AddMinutes(-4),
            Status = "OPEN",
            CurrentStage = TowTripStage.Accepted
        },
        new TowRequestItemViewModel
        {
            Id = 102,
            RequestCode = "TOW-8842",
            CustomerName = "Mostafa Mahmoud",
            CustomerPhone = "+20 112 345 6789",
            VehicleMakeModel = "Kia Cerato",
            VehicleYear = 2020,
            VehiclePlate = "ق ر ص - 7741",
            ProblemType = "Engine Overheating / Complete Breakdown",
            IsVehicleMovable = true,
            IsEmergencyP0 = false,
            TowTypeRequired = "Standard Flatbed or Wheel-Lift",
            PickupAddress = "Wahat Road, In front of Mall of Egypt, 6th of October",
            PickupLat = 29.9723,
            PickupLng = 31.0164,
            DestinationAddress = "Al-Amal Authorized Garage, Dokki, Giza",
            DestinationLat = 30.0392,
            DestinationLng = 31.2125,
            DistanceToPickupKm = 5.8,
            TowingDistanceKm = 21.0,
            EstimatedEtaMinutes = 14,
            EstimatedPrice = 800m,
            PaymentMethod = "Cash",
            AdditionalNotes = "Car is in neutral gear on the right shoulder of the road.",
            RequestedAt = DateTime.Now.AddMinutes(-12),
            Status = "OPEN",
            CurrentStage = TowTripStage.Accepted
        },
        new TowRequestItemViewModel
        {
            Id = 103,
            RequestCode = "TOW-8835",
            CustomerName = "Karim Adel",
            CustomerPhone = "+20 122 998 1122",
            VehicleMakeModel = "BMW 320i",
            VehicleYear = 2022,
            VehiclePlate = "س ص ع - 991",
            ProblemType = "Transmission Failure (Gearbox Locked)",
            IsVehicleMovable = false,
            IsEmergencyP0 = false,
            TowTypeRequired = "Hydraulic Flatbed (ونش مسطح هيدروليك)",
            PickupAddress = "Cairo-Alexandria Desert Road, Km 28, Smart Village",
            PickupLat = 30.0744,
            PickupLng = 31.0195,
            DestinationAddress = "Bavarian Auto Care Center, Abu Rawash",
            DestinationLat = 30.0450,
            DestinationLng = 31.0650,
            DistanceToPickupKm = 2.1,
            TowingDistanceKm = 9.4,
            EstimatedEtaMinutes = 6,
            EstimatedPrice = 550m,
            PaymentMethod = "Cash",
            AdditionalNotes = "Low ground clearance bumper, please use ramp extensions.",
            RequestedAt = DateTime.Now.AddMinutes(-25),
            Status = "EN_ROUTE",
            CurrentStage = TowTripStage.EnRouteToPickup
        }
    };

    private static List<TowHistoryItemViewModel> _history = new()
    {
        new()
        {
            RequestId = 98,
            RequestCode = "TOW-8790",
            Date = DateTime.Now.AddHours(-5),
            CustomerName = "Yasser Ibrahim",
            VehicleInfo = "Nissan Sunny 2021 (ط ظ ع - 3412)",
            PickupLocation = "Ring Road, Exit 12, Maadi",
            DropoffLocation = "Master Fix Garage, Zahraa El-Maadi",
            TotalDistanceKm = 11.2,
            TotalCost = 500m,
            Status = "COMPLETED",
            CustomerRating = 5,
            CustomerReviewComment = "وصل في أقل من 10 دقايق وكان حريص جداً وهو بيرفع العربية على الونش. شكراً!"
        },
        new()
        {
            RequestId = 95,
            RequestCode = "TOW-8744",
            Date = DateTime.Now.AddDays(-1),
            CustomerName = "Hany Ramzy",
            VehicleInfo = "Toyota Corolla 2022 (ج د هـ - 8819)",
            PickupLocation = "Faisal Street, Station 20, Giza",
            DropoffLocation = "Toyota Service Center, Abu Rawash",
            TotalDistanceKm = 16.8,
            TotalCost = 700m,
            Status = "COMPLETED",
            CustomerRating = 5,
            CustomerReviewComment = "محترم جداً ومواعيده مظبوطة والسعر زي ما التطبيق حسبه بالظبط."
        },
        new()
        {
            RequestId = 91,
            RequestCode = "TOW-8710",
            Date = DateTime.Now.AddDays(-2),
            CustomerName = "Omar Khaled",
            VehicleInfo = "Chevrolet Optra 2019 (ب ن م - 4512)",
            PickupLocation = "Remaya Square, Haram, Giza",
            DropoffLocation = "El-Nour Auto Workshop, October City",
            TotalDistanceKm = 19.5,
            TotalCost = 750m,
            Status = "COMPLETED",
            CustomerRating = 4,
            CustomerReviewComment = "خدمة ممتازة وسريعة."
        },
        new()
        {
            RequestId = 88,
            RequestCode = "TOW-8690",
            Date = DateTime.Now.AddDays(-3),
            CustomerName = "Tarek Zaki",
            VehicleInfo = "Renault Logan 2018 (د ر س - 1102)",
            PickupLocation = "Zamalek, 26th July St.",
            DropoffLocation = "Downtown Garage",
            TotalDistanceKm = 6.0,
            TotalCost = 0m,
            Status = "CANCELLED",
            CustomerRating = null,
            CustomerReviewComment = "تم إلغاء الطلب من العميل قبل التحرك."
        }
    };

    #endregion

    #region 1. Dashboard Actions (لوحة التحكم وحالة الونش)

    // GET: /TowProvider/Dashboard
    [HttpGet]
    public IActionResult Dashboard()
    {
        var activeTow = _requests.FirstOrDefault(r =>
            r.Status is "ACCEPTED" or "EN_ROUTE" or "ARRIVED" or "IN_SERVICE");

        var newRequests = _requests.Where(r => r.Status == "OPEN").ToList();
        var completedHistory = _history.Where(h => h.Status == "COMPLETED").ToList();

        var vm = new TowDashboardViewModel
        {
            ProviderName = _profile.FullName,
            TruckType = _profile.TruckType,
            PlateNumber = _profile.TruckPlateNumber,
            IsOnline = _isOnline,
            IsVerified = _profile.VerificationStatus == "VERIFIED",
            AverageRating = 4.9,
            TotalReviews = completedHistory.Count(h => h.CustomerRating.HasValue),
            TodayEarnings = completedHistory.Where(h => h.Date.Date == DateTime.Today).Sum(h => h.TotalCost) + 500m,
            MonthlyEarnings = completedHistory.Sum(h => h.TotalCost) + 4250m,
            CompletedTowsCount = completedHistory.Count + 14,
            PendingRequestsCount = newRequests.Count,
            ActiveTow = activeTow,
            RecentNewRequests = newRequests
        };

        return View(vm);
    }

    // POST: /TowProvider/ToggleAvailability
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ToggleAvailability()
    {
        _isOnline = !_isOnline;
        TempData["Success"] = _isOnline
            ? "You are now ONLINE and ready to receive tow requests!"
            : "You are now OFFLINE. You will not receive new tow dispatches.";
        return RedirectToAction(nameof(Dashboard));
    }

    #endregion

    #region 2 & 3. Tow Requests & Request Details Actions (طلبات السحب وتفاصيلها)

    // GET: /TowProvider/Requests
    [HttpGet]
    public IActionResult Requests()
    {
        var openRequests = _requests.Where(r => r.Status == "OPEN").ToList();
        ViewBag.IsOnline = _isOnline;
        return View(openRequests);
    }

    // GET: /TowProvider/RequestDetails/101
    [HttpGet]
    public IActionResult RequestDetails(int id)
    {
        var request = _requests.FirstOrDefault(r => r.Id == id) ?? _requests.First();
        return View(request);
    }

    // POST: /TowProvider/AcceptRequest
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AcceptRequest(int id)
    {
        var request = _requests.FirstOrDefault(r => r.Id == id);
        if (request != null)
        {
            // Ensure any previous active tow is marked completed for clean demo flow
            foreach (var active in _requests.Where(r => r.Status is "ACCEPTED" or "EN_ROUTE" or "ARRIVED" or "IN_SERVICE"))
            {
                active.Status = "OPEN";
            }

            request.Status = "ACCEPTED";
            request.CurrentStage = TowTripStage.Accepted;
            TempData["Success"] = $"Tow Request #{request.RequestCode} accepted! Proceed to pickup location.";
            return RedirectToAction(nameof(ActiveTow), new { id = request.Id });
        }

        return RedirectToAction(nameof(Requests));
    }

    // POST: /TowProvider/RejectRequest
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult RejectRequest(int id)
    {
        var request = _requests.FirstOrDefault(r => r.Id == id);
        if (request != null)
        {
            request.Status = "CANCELLED";
            TempData["Warning"] = $"Tow Request #{request.RequestCode} was declined and forwarded to another tow truck.";
        }

        return RedirectToAction(nameof(Requests));
    }

    #endregion

    #region 4 & 5. Active Tow & Navigation Actions (رحلة السحب النشطة والتوجيه)

    // GET: /TowProvider/ActiveTow
    [HttpGet]
    public IActionResult ActiveTow(int? id)
    {
        var activeRequest = id.HasValue
            ? _requests.FirstOrDefault(r => r.Id == id.Value)
            : _requests.FirstOrDefault(r => r.Status is "ACCEPTED" or "EN_ROUTE" or "ARRIVED" or "IN_SERVICE");

        activeRequest ??= _requests.First();
        return View(activeRequest);
    }

    // POST: /TowProvider/UpdateTowStage
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdateTowStage(int id, TowTripStage nextStage)
    {
        var request = _requests.FirstOrDefault(r => r.Id == id);
        if (request != null)
        {
            request.CurrentStage = nextStage;
            switch (nextStage)
            {
                case TowTripStage.EnRouteToPickup:
                    request.Status = "EN_ROUTE";
                    TempData["Success"] = "Status updated: En Route to Customer Pickup Location.";
                    break;
                case TowTripStage.ArrivedAtPickup:
                    request.Status = "ARRIVED";
                    TempData["Success"] = "Status updated: Arrived at Pickup Location. Ready for vehicle loading.";
                    break;
                case TowTripStage.LoadingAndTowing:
                    request.Status = "IN_SERVICE";
                    TempData["Success"] = "Status updated: Vehicle loaded on flatbed! Towing to destination started.";
                    break;
                case TowTripStage.Completed:
                    request.Status = "COMPLETED";
                    _history.Insert(0, new TowHistoryItemViewModel
                    {
                        RequestId = request.Id,
                        RequestCode = request.RequestCode,
                        Date = DateTime.Now,
                        CustomerName = request.CustomerName,
                        VehicleInfo = $"{request.VehicleMakeModel} {request.VehicleYear} ({request.VehiclePlate})",
                        PickupLocation = request.PickupAddress,
                        DropoffLocation = request.DestinationAddress,
                        TotalDistanceKm = request.TowingDistanceKm,
                        TotalCost = request.EstimatedPrice,
                        Status = "COMPLETED",
                        CustomerRating = 5,
                        CustomerReviewComment = "Completed smoothly via FixNGo Tow Dispatch."
                    });
                    TempData["Success"] = $"Tow Trip #{request.RequestCode} completed! Payment of {request.EstimatedPrice} EGP recorded.";
                    return RedirectToAction(nameof(Earnings));
            }
        }

        return RedirectToAction(nameof(ActiveTow), new { id });
    }

    // GET: /TowProvider/Navigation
    [HttpGet]
    public IActionResult Navigation(int? id)
    {
        var activeRequest = id.HasValue
            ? _requests.FirstOrDefault(r => r.Id == id.Value)
            : _requests.FirstOrDefault(r => r.Status is "ACCEPTED" or "EN_ROUTE" or "ARRIVED" or "IN_SERVICE") ?? _requests.First();

        return View(activeRequest);
    }

    #endregion

    #region 6 & 7. Earnings & Tow History Actions (الأرباح وسجل السحب)

    // GET: /TowProvider/Earnings
    [HttpGet]
    public IActionResult Earnings()
    {
        var completed = _history.Where(h => h.Status == "COMPLETED").ToList();
        var transactions = completed.Select((h, index) => new TowTransactionItemViewModel
        {
            RequestId = h.RequestId,
            InvoiceNumber = $"INV-2026-{900 + index}",
            CompletedAt = h.Date,
            CustomerName = h.CustomerName,
            RouteSummary = $"{h.PickupLocation.Split(',')[0]} ➔ {h.DropoffLocation.Split(',')[0]}",
            DistanceKm = h.TotalDistanceKm,
            Amount = h.TotalCost,
            PaymentMethod = index % 2 == 0 ? "Cash" : "Online (Gate)",
            PayoutStatus = "Settled"
        }).ToList();

        var vm = new TowEarningsViewModel
        {
            TotalBalance = completed.Sum(x => x.TotalCost) + 4250m,
            ThisWeekEarnings = completed.Sum(x => x.TotalCost) + 1200m,
            ThisMonthEarnings = completed.Sum(x => x.TotalCost) + 4250m,
            CashCollected = 2850m,
            OnlinePayoutPending = 1400m,
            TotalCompletedTrips = completed.Count + 14,
            Transactions = transactions
        };

        return View(vm);
    }

    // GET: /TowProvider/History
    [HttpGet]
    public IActionResult History()
    {
        return View(_history);
    }

    #endregion

    #region 8. Tow Provider Profile Actions (الملف الشخصي للونش)

    // GET: /TowProvider/Profile
    [HttpGet]
    public IActionResult Profile()
    {
        return View(_profile);
    }

    // POST: /TowProvider/Profile
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Profile(TowProviderProfileViewModel model)
    {
        _profile.FullName = model.FullName;
        _profile.PhoneNumber = model.PhoneNumber;
        _profile.City = model.City;
        _profile.TruckType = model.TruckType;
        _profile.TruckMakeModel = model.TruckMakeModel;
        _profile.TruckPlateNumber = model.TruckPlateNumber;
        _profile.MaxLoadCapacityTons = model.MaxLoadCapacityTons;
        _profile.SupportedVehicleTypes = model.SupportedVehicleTypes;

        TempData["Success"] = "Tow truck profile and capacity details updated successfully!";
        return RedirectToAction(nameof(Profile));
    }

    #endregion
}