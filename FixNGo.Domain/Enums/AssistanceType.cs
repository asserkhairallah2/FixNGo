namespace FixNGo.Domain.Enums;

/// <summary>
/// Roadside assistance categories supported by the platform (SRS FR-13, FR-16, SAD UC-07).
/// </summary>
public enum AssistanceType
{
    /// <summary>
    /// Vehicle towing service to a garage or home.
    /// </summary>
    Towing = 1,

    /// <summary>
    /// On-site mobile mechanic inspection and repair.
    /// </summary>
    Mechanic = 2,

    /// <summary>
    /// Tire repair, puncture patch, or spare tire replacement.
    /// </summary>
    TireService = 3,

    /// <summary>
    /// Dead battery jump-start or battery replacement.
    /// </summary>
    BatteryService = 4,

    /// <summary>
    /// Emergency fuel delivery.
    /// </summary>
    FuelDelivery = 5,

    /// <summary>
    /// Vehicle lockout assistance.
    /// </summary>
    Lockout = 6,

    /// <summary>
    /// General or unknown breakdown problem requiring on-site diagnosis.
    /// </summary>
    Other = 7
}

