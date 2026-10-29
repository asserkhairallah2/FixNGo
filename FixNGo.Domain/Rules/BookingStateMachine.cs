using System.Collections.Generic;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;

namespace FixNGo.Domain.Rules;

/// <summary>
/// Domain state machine enforcing valid appointment lifecycle transitions (SAD UC-14, UC-27).
/// </summary>
public static class BookingStateMachine
{
    private static readonly Dictionary<BookingStatus, HashSet<BookingStatus>> AllowedTransitions = new()
    {
        [BookingStatus.Pending] = new()
        {
            BookingStatus.Confirmed,
            BookingStatus.Rejected,
            BookingStatus.Cancelled
        },
        [BookingStatus.Confirmed] = new()
        {
            BookingStatus.Completed,
            BookingStatus.Cancelled
        },
        [BookingStatus.Rejected] = new(),
        [BookingStatus.Cancelled] = new(),
        [BookingStatus.Completed] = new()
    };

    /// <summary>
    /// Validates whether transitioning from the current booking status to the target status is allowed.
    /// </summary>
    public static Result ValidateTransition(BookingStatus current, BookingStatus next)
    {
        if (AllowedTransitions.TryGetValue(current, out var allowed) && allowed.Contains(next))
        {
            return Result.Success();
        }

        return Result.Failure($"Transition from '{current}' to '{next}' is not allowed.");
    }
}

