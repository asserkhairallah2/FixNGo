using System;

namespace FixNGo.Domain.ValueObjects;

/// <summary>
/// Value object representing geospatial coordinates (latitude and longitude) with Haversine distance calculation.
/// </summary>
public record GeoPoint
{
    public double Latitude { get; }
    public double Longitude { get; }
    public string? Address { get; }

    public GeoPoint(double latitude, double longitude, string? address = null)
    {
        if (latitude is < -90.0 or > 90.0)
            throw new ArgumentOutOfRangeException(nameof(latitude), "Latitude must be between -90 and 90 degrees.");

        if (longitude is < -180.0 or > 180.0)
            throw new ArgumentOutOfRangeException(nameof(longitude), "Longitude must be between -180 and 180 degrees.");

        Latitude = latitude;
        Longitude = longitude;
        Address = address;
    }

    /// <summary>
    /// Calculates the great-circle distance between two geographic coordinates using the Haversine formula.
    /// </summary>
    public double DistanceToKm(GeoPoint destination)
    {
        ArgumentNullException.ThrowIfNull(destination);

        const double EarthRadiusKm = 6371.0;

        double dLat = ToRadians(destination.Latitude - Latitude);
        double dLon = ToRadians(destination.Longitude - Longitude);

        double lat1Rad = ToRadians(Latitude);
        double lat2Rad = ToRadians(destination.Latitude);

        double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                   Math.Sin(dLon / 2) * Math.Sin(dLon / 2) * Math.Cos(lat1Rad) * Math.Cos(lat2Rad);

        double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return EarthRadiusKm * c;
    }

    private static double ToRadians(double degrees) => degrees * (Math.PI / 180.0);
}

