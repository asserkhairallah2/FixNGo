using System;
using System.Collections.Generic;

namespace FixNGo.Domain.Common;

/// <summary>
/// Generic base entity supporting Clean Architecture and DDD principles.
/// Provides primary key, audit timestamps, soft deletion, and domain event dispatching.
/// </summary>
/// <typeparam name="TKey">Primary key type (e.g., int, Guid).</typeparam>
public abstract class BaseEntity<TKey> : IBaseEntity<TKey>, IAuditableEntity, ISoftDeletable
{
    public TKey Id { get; set; } = default!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public bool IsDeleted { get; set; } = false;

    public DateTime? DeletedAt { get; set; }

    private readonly List<IDomainEvent> _domainEvents = new();

    /// <summary>
    /// Read-only collection of domain events raised by this aggregate or entity.
    /// </summary>
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void RemoveDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Remove(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }

    public override bool Equals(object? obj)
    {
        if (obj is not BaseEntity<TKey> other)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        if (GetType() != other.GetType())
            return false;

        if (EqualityComparer<TKey>.Default.Equals(Id, default) ||
            EqualityComparer<TKey>.Default.Equals(other.Id, default))
            return false;

        return EqualityComparer<TKey>.Default.Equals(Id, other.Id);
    }

    public override int GetHashCode()
    {
        return EqualityComparer<TKey>.Default.GetHashCode(Id!);
    }

    public static bool operator ==(BaseEntity<TKey>? left, BaseEntity<TKey>? right)
    {
        return Equals(left, right);
    }

    public static bool operator !=(BaseEntity<TKey>? left, BaseEntity<TKey>? right)
    {
        return !Equals(left, right);
    }
}

/// <summary>
/// Standard base entity with integer auto-increment identity primary key (typical for SQL Server).
/// </summary>
public abstract class BaseEntity : BaseEntity<int>
{
}

