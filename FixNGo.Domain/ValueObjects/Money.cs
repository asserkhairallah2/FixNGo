using System;

namespace FixNGo.Domain.ValueObjects;

/// <summary>
/// Value object representing a monetary amount with currency.
/// </summary>
public record Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency = "EGP")
    {
        if (string.IsNullOrWhiteSpace(currency))
            throw new ArgumentException("Currency code cannot be empty.", nameof(currency));

        Amount = amount;
        Currency = currency.ToUpperInvariant();
    }

    public Money Add(Money other)
    {
        ArgumentNullException.ThrowIfNull(other);
        AssertSameCurrency(other);

        return new Money(Amount + other.Amount, Currency);
    }

    public Money Subtract(Money other)
    {
        ArgumentNullException.ThrowIfNull(other);
        AssertSameCurrency(other);

        return new Money(Amount - other.Amount, Currency);
    }

    private void AssertSameCurrency(Money other)
    {
        if (!string.Equals(Currency, other.Currency, StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException($"Cannot operate on amounts with different currencies: '{Currency}' and '{other.Currency}'.");
    }
}

