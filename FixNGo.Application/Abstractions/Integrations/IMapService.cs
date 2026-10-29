using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.ValueObjects;

namespace FixNGo.Application.Abstractions.Integrations;

/// <summary>
/// Geospatial and mapping service abstraction (e.g. Google Maps Platform adapter).
/// </summary>
public interface IMapService
{
    /// <summary>
    /// Calculates driving distance in kilometers between two geographic points.
    /// </summary>
    Task<double> CalculateDistanceKmAsync(GeoPoint origin, GeoPoint destination, CancellationToken cancellationToken = default);

    /// <summary>
    /// Estimates travel duration in minutes between two geographic points.
    /// </summary>
    Task<int> EstimateEtaMinutesAsync(GeoPoint origin, GeoPoint destination, CancellationToken cancellationToken = default);

    /// <summary>
    /// Converts latitude and longitude coordinates into a human-readable street address.
    /// </summary>
    Task<string> ReverseGeocodeAsync(double latitude, double longitude, CancellationToken cancellationToken = default);
}

