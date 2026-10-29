namespace FixNGo.Domain.Common;

/// <summary>
/// Contract for all domain entities having a unique identifier.
/// </summary>
/// <typeparam name="TKey">Type of the identifier (e.g., int, Guid).</typeparam>
public interface IBaseEntity<TKey>
{
    TKey Id { get; }
}

