using System;

namespace FixNGo.Domain.Common;

/// <summary>
/// Marker interface representing a domain event raised when state changes occur.
/// </summary>
public interface IDomainEvent
{
    DateTime OccurredOnUtc { get; }
}

