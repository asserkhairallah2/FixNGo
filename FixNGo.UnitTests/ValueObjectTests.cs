using System;
using FixNGo.Domain.ValueObjects;
using Xunit;

namespace FixNGo.UnitTests;

public class ValueObjectTests
{
    [Fact]
    public void GeoPoint_CalculatesDistanceCorrectly_UsingHaversine()
    {
        // Cairo Tower (30.0459, 31.2243) to Tahrir Square (30.0444, 31.2357) ~1.1 km
        var cairoTower = new GeoPoint(30.0459, 31.2243, "Cairo Tower");
        var tahrirSquare = new GeoPoint(30.0444, 31.2357, "Tahrir Square");

        double distanceKm = cairoTower.DistanceToKm(tahrirSquare);

        Assert.True(distanceKm > 0.9 && distanceKm < 1.3, $"Distance should be approx 1.1km, but got {distanceKm}km");
    }

    [Theory]
    [InlineData(91.0, 31.0)]
    [InlineData(-91.0, 31.0)]
    [InlineData(30.0, 185.0)]
    [InlineData(30.0, -185.0)]
    public void GeoPoint_ThrowsException_OnInvalidCoordinates(double lat, double lon)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => new GeoPoint(lat, lon));
    }

    [Fact]
    public void Money_AddAndSubtract_WorkCorrectly()
    {
        var m1 = new Money(150m, "EGP");
        var m2 = new Money(50m, "EGP");

        var sum = m1.Add(m2);
        var diff = m1.Subtract(m2);

        Assert.Equal(200m, sum.Amount);
        Assert.Equal(100m, diff.Amount);
        Assert.Equal("EGP", sum.Currency);
    }

    [Fact]
    public void Money_ThrowsException_OnCurrencyMismatch()
    {
        var egp = new Money(100m, "EGP");
        var usd = new Money(10m, "USD");

        Assert.Throws<InvalidOperationException>(() => egp.Add(usd));
    }
}
