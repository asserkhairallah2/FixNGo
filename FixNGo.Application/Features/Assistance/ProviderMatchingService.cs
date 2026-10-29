using System;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Integrations;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Enums;

namespace FixNGo.Application.Features.Assistance;

/// <summary>
/// Domain service handling provider matching and dynamic fare calculation based on distance and service type.
/// </summary>
public class ProviderMatchingService : IProviderMatchingService
{
    private readonly IProviderRepository? _providerRepository;
    private readonly IMapService _mapService;

    public ProviderMatchingService(IProviderRepository? providerRepository, IMapService mapService)
    {
        _providerRepository = providerRepository;
        _mapService = mapService;
    }

    /// <summary>
    /// Calculates the estimated service fare in Egyptian Pounds (EGP) based on base rate and per-km distance fee.
    /// Towing: 250 base + 15 / km
    /// Mechanic: 150 base + 8 / km
    /// TireService: 100 base + 0 / km
    /// </summary>
    public Task<decimal> CalculateEstimatedFareAsync(
        AssistanceType type,
        double distanceKm,
        CancellationToken cancellationToken = default)
    {
        if (distanceKm < 0)
            throw new ArgumentOutOfRangeException(nameof(distanceKm), "Distance cannot be negative.");

        var (baseFare, perKmRate) = type switch
        {
            AssistanceType.Towing => (250m, 15m),
            AssistanceType.Mechanic => (150m, 8m),
            AssistanceType.TireService => (100m, 0m),
            AssistanceType.BatteryService => (100m, 0m),
            AssistanceType.FuelDelivery => (80m, 5m),
            AssistanceType.Lockout => (120m, 0m),
            _ => (100m, 10m)
        };

        decimal totalFare = baseFare + ((decimal)distanceKm * perKmRate);
        return Task.FromResult(totalFare);
    }
}

