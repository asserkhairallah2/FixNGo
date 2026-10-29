using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Integrations;
using FixNGo.Application.Features.Assistance;
using FixNGo.Domain.Enums;
using FixNGo.Domain.ValueObjects;
using Xunit;

namespace FixNGo.UnitTests;

public class MockMapService : IMapService
{
    public Task<double> CalculateDistanceKmAsync(GeoPoint origin, GeoPoint destination, System.Threading.CancellationToken cancellationToken = default)
    {
        return Task.FromResult(origin.DistanceToKm(destination));
    }

    public Task<int> EstimateEtaMinutesAsync(GeoPoint origin, GeoPoint destination, System.Threading.CancellationToken cancellationToken = default)
    {
        return Task.FromResult((int)(origin.DistanceToKm(destination) * 2));
    }

    public Task<string> ReverseGeocodeAsync(double latitude, double longitude, System.Threading.CancellationToken cancellationToken = default)
    {
        return Task.FromResult("Mock Address");
    }
}

public class PricingAndMatchingTests
{
    [Theory]
    [InlineData(AssistanceType.Towing, 10.0, 400.0)]    // 250 base + 10 * 15 = 400
    [InlineData(AssistanceType.Mechanic, 5.0, 190.0)]   // 150 base + 5 * 8 = 190
    [InlineData(AssistanceType.TireService, 0.0, 100.0)] // 100 base + 0 = 100
    public async Task CalculateEstimatedFare_CalculatesAccurately(AssistanceType type, double distance, decimal expected)
    {
        var service = new ProviderMatchingService(null!, new MockMapService());
        var fare = await service.CalculateEstimatedFareAsync(type, distance);
        Assert.Equal(expected, fare);
    }
}
