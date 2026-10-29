namespace FixNGo.Domain.Enums;

/// <summary>
/// Verification lifecycle states for Service Centers and Providers according to Admin approval rules (SAD UC-28, SRS FR-34).
/// </summary>
public enum VerificationStatus
{
    /// <summary>
    /// Registration submitted; awaiting administrative document review and validation.
    /// </summary>
    Pending = 0,

    /// <summary>
    /// Verified and approved by Admin. Authorized to publish catalog and accept bookings.
    /// </summary>
    Verified = 1,

    /// <summary>
    /// Rejected due to missing, invalid, or expired paperwork.
    /// </summary>
    Rejected = 2,

    /// <summary>
    /// Temporarily or permanently suspended due to policy violations or complaints.
    /// </summary>
    Suspended = 3
}

