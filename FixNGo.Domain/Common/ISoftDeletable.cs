using System;

namespace FixNGo.Domain.Common;

/// <summary>
/// Contract for entities supporting logical (soft) deletion.
/// </summary>
public interface ISoftDeletable
{
    bool IsDeleted { get; set; }
    DateTime? DeletedAt { get; set; }
}

