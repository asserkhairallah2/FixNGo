namespace FixNGo.Domain.Enums;

/// <summary>
/// Status lifecycle of an appointment booking at a Service Center (SAD UC-14, UC-27).
/// </summary>
public enum BookingStatus
{
    /// <summary>
    /// Submitted by the customer; awaiting service center acceptance.
    /// </summary>
    Pending = 0,

    /// <summary>
    /// Accepted and confirmed by the service center. Time slot is reserved.
    /// </summary>
    Confirmed = 1,

    /// <summary>
    /// Rejected by the service center (e.g. fully booked or unable to perform service).
    /// </summary>
    Rejected = 2,

    /// <summary>
    /// Cancelled by the customer prior to appointment completion.
    /// </summary>
    Cancelled = 3,

    /// <summary>
    /// Service successfully fulfilled at the service center.
    /// </summary>
    Completed = 4
}

