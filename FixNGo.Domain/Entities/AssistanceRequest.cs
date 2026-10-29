using System;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;
using FixNGo.Domain.Rules;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Assistance Request entity representing an emergency roadside assistance job (SRS FR-10..FR-26, SAD UC-04, UC-10, UC-22..UC-25).
/// </summary>
public class AssistanceRequest : BaseEntity
{
    /// <summary>
    /// Foreign key referencing the customer user account.
    /// </summary>
    public string CustomerId { get; set; } = string.Empty;

    /// <summary>
    /// Customer full name for presentation and quick dispatch view.
    /// </summary>
    public string CustomerName { get; set; } = string.Empty;

    /// <summary>
    /// Customer contact phone number (SRS FR-27).
    /// </summary>
    public string CustomerPhone { get; set; } = string.Empty;

    /// <summary>
    /// Foreign key referencing the assigned service provider (ApplicationUser with Role=Provider).
    /// Nullable until accepted by a provider.
    /// </summary>
    public string? ProviderId { get; set; }

    /// <summary>
    /// Category of assistance requested (Towing, Mechanic, TireService, BatteryService, FuelDelivery, Lockout, Other).
    /// </summary>
    public AssistanceType ServiceType { get; set; } = AssistanceType.Mechanic;

    /// <summary>
    /// Description of the vehicle problem reported by the driver (SRS FR-13).
    /// </summary>
    public string? ProblemDescription { get; set; }

    /// <summary>
    /// Current lifecycle status in the assistance request state machine.
    /// </summary>
    public AssistanceRequestStatus Status { get; set; } = AssistanceRequestStatus.Open;

    /// <summary>
    /// Customer breakdown location GPS Latitude.
    /// </summary>
    public double CustomerLatitude { get; set; }

    /// <summary>
    /// Customer breakdown location GPS Longitude.
    /// </summary>
    public double CustomerLongitude { get; set; }

    /// <summary>
    /// Human-readable customer breakdown address or road landmark (e.g. "Cairo-Alexandria Desert Road, Km 28").
    /// </summary>
    public string? CustomerAddress { get; set; }

    /// <summary>
    /// Customer's vehicle information (e.g. "Toyota Corolla 2021 - White").
    /// </summary>
    public string? VehicleInfo { get; set; }

    /// <summary>
    /// Customer's vehicle license plate number.
    /// </summary>
    public string? VehiclePlateNumber { get; set; }

    /// <summary>
    /// Indicates whether this is a high-priority emergency (P0: accident or injury) requiring expedited dispatch (SAD NFR-05).
    /// </summary>
    public bool IsP0Emergency { get; set; } = false;

    /// <summary>
    /// Estimated fare calculated at dispatch time in Egyptian Pounds (EGP).
    /// </summary>
    public decimal EstimatedFare { get; set; }

    /// <summary>
    /// Final negotiated or actual fare charged upon service completion in Egyptian Pounds (EGP).
    /// </summary>
    public decimal? FinalFare { get; set; }

    /// <summary>
    /// Provider's current or last reported GPS Latitude for live tracking (SAD UC-24, SRS FR-23).
    /// </summary>
    public double? ProviderLatitude { get; set; }

    /// <summary>
    /// Provider's current or last reported GPS Longitude for live tracking (SAD UC-24, SRS FR-23).
    /// </summary>
    public double? ProviderLongitude { get; set; }

    /// <summary>
    /// Timestamp when a provider accepted the request.
    /// </summary>
    public DateTime? AcceptedAt { get; set; }

    /// <summary>
    /// Timestamp when provider started moving toward customer (En Route).
    /// </summary>
    public DateTime? EnRouteAt { get; set; }

    /// <summary>
    /// Timestamp when provider arrived at customer location.
    /// </summary>
    public DateTime? ArrivedAt { get; set; }

    /// <summary>
    /// Timestamp when service work began.
    /// </summary>
    public DateTime? InServiceAt { get; set; }

    /// <summary>
    /// Timestamp when service was successfully completed.
    /// </summary>
    public DateTime? CompletedAt { get; set; }

    /// <summary>
    /// Timestamp when request was cancelled.
    /// </summary>
    public DateTime? CancelledAt { get; set; }

    /// <summary>
    /// Reason provided if request is rejected or cancelled.
    /// </summary>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Reason provided if request is cancelled.
    /// </summary>
    public string? CancellationReason { get; set; }

    /// <summary>
    /// Customer rating given after service completion (1 to 5 stars) (SRS FR-39).
    /// </summary>
    public int? Rating { get; set; }

    /// <summary>
    /// Written customer review / feedback (SRS FR-40).
    /// </summary>
    public string? ReviewText { get; set; }

    /// <summary>
    /// Selected payment method ("Cash", "Online") (SRS FR-36).
    /// </summary>
    public string? PaymentMethod { get; set; }

    /// <summary>
    /// Indicates whether the service fare has been settled / paid.
    /// </summary>
    public bool IsPaid { get; set; } = false;

    /// <summary>
    /// Timestamp when payment was settled.
    /// </summary>
    public DateTime? PaidAt { get; set; }

    /// <summary>
    /// Concurrency token for optimistic locking to prevent concurrent providers accepting the same request.
    /// </summary>
    public byte[]? RowVersion { get; set; }

    // Navigation Properties
    public virtual ApplicationUser? Customer { get; set; }

    public virtual ApplicationUser? Provider { get; set; }

    // Domain Invariants & State Transitions
    /// <summary>
    /// Accepts the assistance request by an authenticated provider.
    /// Prevents double acceptance or accepting requests assigned to another provider.
    /// </summary>
    public void Accept(string providerId)
    {
        if (string.IsNullOrWhiteSpace(providerId))
            throw new ArgumentException("Provider ID cannot be empty.", nameof(providerId));

        if (!string.IsNullOrEmpty(ProviderId) && ProviderId != providerId)
            throw new InvalidOperationException("Request has already been accepted by another service provider.");

        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.Accepted);
        if (!transitionResult.IsSuccess)
            throw new InvalidOperationException(transitionResult.Error);

        ProviderId = providerId;
        Status = AssistanceRequestStatus.Accepted;
        AcceptedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Transitions request to EnRoute when provider departs toward customer.
    /// </summary>
    public void StartTrip()
    {
        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.EnRoute);
        if (!transitionResult.IsSuccess)
            throw new InvalidOperationException(transitionResult.Error);

        Status = AssistanceRequestStatus.EnRoute;
        EnRouteAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Transitions request to Arrived when provider reaches the customer's vehicle.
    /// </summary>
    public void MarkArrived()
    {
        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.Arrived);
        if (!transitionResult.IsSuccess)
            throw new InvalidOperationException(transitionResult.Error);

        Status = AssistanceRequestStatus.Arrived;
        ArrivedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Transitions request to InService when provider starts repair/towing work.
    /// </summary>
    public void StartService()
    {
        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.InService);
        if (!transitionResult.IsSuccess)
            throw new InvalidOperationException(transitionResult.Error);

        Status = AssistanceRequestStatus.InService;
        InServiceAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Transitions request to Completed upon successful job completion.
    /// </summary>
    public void Complete(decimal? finalFare = null)
    {
        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.Completed);
        if (!transitionResult.IsSuccess)
            throw new InvalidOperationException(transitionResult.Error);

        Status = AssistanceRequestStatus.Completed;
        CompletedAt = DateTime.UtcNow;
        FinalFare = finalFare ?? (FinalFare ?? EstimatedFare);
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Cancels the assistance request.
    /// </summary>
    public void Cancel(string reason)
    {
        var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.Cancelled);
        if (!transitionResult.IsSuccess)
            throw new InvalidOperationException(transitionResult.Error);

        Status = AssistanceRequestStatus.Cancelled;
        CancellationReason = reason;
        CancelledAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Records payment settlement.
    /// </summary>
    public void RecordPayment(string paymentMethod, decimal? amount = null)
    {
        IsPaid = true;
        PaymentMethod = paymentMethod;
        PaidAt = DateTime.UtcNow;
        if (amount.HasValue)
            FinalFare = amount.Value;

        if (Status == AssistanceRequestStatus.Completed)
        {
            var transitionResult = AssistanceRequestStateMachine.ValidateTransition(Status, AssistanceRequestStatus.Paid);
            if (transitionResult.IsSuccess)
            {
                Status = AssistanceRequestStatus.Paid;
            }
        }

        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Records customer rating and review.
    /// </summary>
    public void RecordRating(int rating, string? review)
    {
        if (rating is < 1 or > 5)
            throw new ArgumentOutOfRangeException(nameof(rating), "Rating must be between 1 and 5 stars.");

        Rating = rating;
        ReviewText = review;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Updates provider live GPS coordinates for tracking (SAD UC-24).
    /// </summary>
    public void UpdateProviderLocation(double latitude, double longitude)
    {
        ProviderLatitude = latitude;
        ProviderLongitude = longitude;
        UpdatedAt = DateTime.UtcNow;
    }
}
