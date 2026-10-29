using System.Threading;
using System.Threading.Tasks;
using FixNGo.Domain.Enums;

namespace FixNGo.Application.Features.Assistance;

/// <summary>
/// Service contract for finding suitable roadside assistance providers and estimating service fares.
/// </summary>
public interface IProviderMatchingService
{
    /// <summary>
    /// Calculates the estimated service fare based on assistance category and driving distance.
    /// </summary>
    /// <param name="type">Assistance category requested.</param>
    /// <param name="distanceKm">Driving distance between provider and customer in kilometers.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Calculated monetary fare in EGP.</returns>
    Task<decimal> CalculateEstimatedFareAsync(AssistanceType type, double distanceKm, CancellationToken cancellationToken = default);
}

