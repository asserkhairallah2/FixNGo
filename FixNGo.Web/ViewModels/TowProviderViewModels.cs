using System;
using System.Collections.Generic;

namespace FixNGo.Web.ViewModels;

#region Enums & Constants

public enum TowTripStage
{
    Accepted = 1,      // تم قبول الطلب
    EnRouteToPickup = 2, // في الطريق للعميل
    ArrivedAtPickup = 3, // تم الوصول للعميل
    LoadingAndTowing = 4, // جاري التحميل والسحب للوجهة
    Completed = 5      // تم الوصول للوجهة وإكمال الطلب
}

#endregion

#region 1. Dashboard ViewModel

public class TowDashboardViewModel
{
    public string ProviderName { get; set; } = string.Empty;
    public string TruckType { get; set; } = string.Empty;
    public string PlateNumber { get; set; } = string.Empty;
    public bool IsOnline { get; set; }
    public bool IsVerified { get; set; }
    public double AverageRating { get; set; }
    public int TotalReviews { get; set; }
    public decimal TodayEarnings { get; set; }
    public decimal MonthlyEarnings { get; set; }
    public int CompletedTowsCount { get; set; }
    public int PendingRequestsCount { get; set; }
    public TowRequestItemViewModel? ActiveTow { get; set; }
    public List<TowRequestItemViewModel> RecentNewRequests { get; set; } = new();
}

#endregion

#region 2 & 3. Tow Requests & Details ViewModel

public class TowRequestItemViewModel
{
    public int Id { get; set; }
    public string RequestCode { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;

    // بيانات السيارة
    public string VehicleMakeModel { get; set; } = string.Empty;
    public int VehicleYear { get; set; }
    public string VehiclePlate { get; set; } = string.Empty;
    public string ProblemType { get; set; } = string.Empty;
    public bool IsVehicleMovable { get; set; }
    public bool IsEmergencyP0 { get; set; }

    // بيانات السحب والموقع والوجهة
    public string TowTypeRequired { get; set; } = string.Empty; // Flatbed, Wheel-Lift, Heavy Duty
    public string PickupAddress { get; set; } = string.Empty;
    public double PickupLat { get; set; }
    public double PickupLng { get; set; }
    public string DestinationAddress { get; set; } = string.Empty;
    public double DestinationLat { get; set; }
    public double DestinationLng { get; set; }

    // المسافة والتكلفة والوقت
    public double DistanceToPickupKm { get; set; }
    public double TowingDistanceKm { get; set; }
    public int EstimatedEtaMinutes { get; set; }
    public decimal EstimatedPrice { get; set; }
    public string PaymentMethod { get; set; } = "Cash";
    public string AdditionalNotes { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
    public string Status { get; set; } = "OPEN"; // OPEN, ACCEPTED, EN_ROUTE, ARRIVED, IN_SERVICE, COMPLETED, CANCELLED
    public TowTripStage CurrentStage { get; set; } = TowTripStage.Accepted;
}

#endregion

#region 6. Earnings ViewModel

public class TowEarningsViewModel
{
    public decimal TotalBalance { get; set; }
    public decimal ThisWeekEarnings { get; set; }
    public decimal ThisMonthEarnings { get; set; }
    public decimal CashCollected { get; set; }
    public decimal OnlinePayoutPending { get; set; }
    public int TotalCompletedTrips { get; set; }
    public List<TowTransactionItemViewModel> Transactions { get; set; } = new();
}

public class TowTransactionItemViewModel
{
    public int RequestId { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public DateTime CompletedAt { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string RouteSummary { get; set; } = string.Empty;
    public double DistanceKm { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty; // Cash / Online
    public string PayoutStatus { get; set; } = string.Empty;  // Paid / Settled / Pending
}

#endregion

#region 7. Tow History ViewModel

public class TowHistoryItemViewModel
{
    public int RequestId { get; set; }
    public string RequestCode { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string VehicleInfo { get; set; } = string.Empty;
    public string PickupLocation { get; set; } = string.Empty;
    public string DropoffLocation { get; set; } = string.Empty;
    public double TotalDistanceKm { get; set; }
    public decimal TotalCost { get; set; }
    public string Status { get; set; } = string.Empty; // COMPLETED, CANCELLED
    public int? CustomerRating { get; set; } // 1 to 5 stars
    public string? CustomerReviewComment { get; set; }
}

#endregion

#region 8. Tow Provider Profile ViewModel

public class TowProviderProfileViewModel
{
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;

    // بيانات الونش
    public string TruckType { get; set; } = string.Empty; // ونش مسطح هيدروليك (Flatbed) / ونش رفع (Wheel-Lift)
    public string TruckMakeModel { get; set; } = string.Empty;
    public string TruckPlateNumber { get; set; } = string.Empty;
    public double MaxLoadCapacityTons { get; set; } // السعة بالطن
    public string SupportedVehicleTypes { get; set; } = string.Empty; // ملاكي، SUV، نقل خفيف

    // حالة التحقق والمستندات
    public string VerificationStatus { get; set; } = "VERIFIED"; // PENDING_VERIFICATION, VERIFIED, REJECTED
    public List<TowDocumentItemViewModel> Documents { get; set; } = new();
}

public class TowDocumentItemViewModel
{
    public string DocumentTitle { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; }
    public string Status { get; set; } = string.Empty; // Approved, Pending
}

#endregion