using System;

namespace FixNGo.Domain.Common;

/// <summary>
/// Contract for entities requiring automatic audit tracking of creation and modification dates.
/// </summary>
public interface IAuditableEntity
{
    DateTime CreatedAt { get; set; }
    DateTime? UpdatedAt { get; set; }
}

