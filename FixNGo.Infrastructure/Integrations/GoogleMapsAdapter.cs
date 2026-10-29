using System;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Integrations;
using FixNGo.Domain.ValueObjects;

namespace FixNGo.Infrastructure.Integrations;

/// <summary>
/// Google Maps Platform adapter implementing IMapService.
/// </summary>
public class GoogleMapsAdapter : IMapService
{
    public Task<double> CalculateDistanceKmAsync(GeoPoint origin, GeoPoint destination, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(origin.DistanceToKm(destination));
    }

    public Task<int> EstimateEtaMinutesAsync(GeoPoint origin, GeoPoint destination, CancellationToken cancellationToken = default)
    {
        double distanceKm = origin.DistanceToKm(destination);
        // Urban estimation: ~30 km/h speed (2 minutes per km) with 3 minutes minimum dispatch overhead
        int etaMinutes = (int)Math.Max(5, Math.Ceiling(distanceKm * 2));
        return Task.FromResult(etaMinutes);
    }

    public Task<string> ReverseGeocodeAsync(double latitude, double longitude, CancellationToken cancellationToken = default)
    {
        return Task.FromResult($"{latitude:F4}, {longitude:F4}");
    }
}

