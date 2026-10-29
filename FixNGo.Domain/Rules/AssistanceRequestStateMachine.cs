using System.Collections.Generic;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;

namespace FixNGo.Domain.Rules;

public static class AssistanceRequestStateMachine
{
    private static readonly Dictionary<AssistanceRequestStatus, HashSet<AssistanceRequestStatus>> AllowedTransitions = new()
    {
        [AssistanceRequestStatus.Open] = new() { AssistanceRequestStatus.Accepted, AssistanceRequestStatus.Cancelled },
        [AssistanceRequestStatus.Accepted] = new() { AssistanceRequestStatus.EnRoute, AssistanceRequestStatus.Cancelled },
        [AssistanceRequestStatus.EnRoute] = new() { AssistanceRequestStatus.Arrived, AssistanceRequestStatus.Cancelled },
        [AssistanceRequestStatus.Arrived] = new() { AssistanceRequestStatus.InService, AssistanceRequestStatus.Cancelled },
        [AssistanceRequestStatus.InService] = new() { AssistanceRequestStatus.Completed },
        [AssistanceRequestStatus.Completed] = new() { AssistanceRequestStatus.Paid },
        [AssistanceRequestStatus.Paid] = new(),
        [AssistanceRequestStatus.Cancelled] = new()
    };

    public static Result ValidateTransition(AssistanceRequestStatus current, AssistanceRequestStatus next)
    {
        if (AllowedTransitions.TryGetValue(current, out var allowed) && allowed.Contains(next))
        {
            return Result.Success();
        }

        return Result.Failure($"Transition from '{current}' to '{next}' is not allowed.");
    }
}

