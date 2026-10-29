using System;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Integrations;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Application.Features.Provider;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Domain.ValueObjects;
using Xunit;

namespace FixNGo.UnitTests;

public class ProviderFeatureTests
{
    [Fact]
    public void AssistanceRequest_Accept_AssignsProviderAndSetsStatusAccepted()
    {
        // Arrange
        var request = new AssistanceRequest
        {
            CustomerId = "cust-1",
            CustomerName = "Tarek Mostafa",
            Status = AssistanceRequestStatus.Open,
            EstimatedFare = 200m
        };

        // Act
        request.Accept("prov-123");

        // Assert
        Assert.Equal("prov-123", request.ProviderId);
        Assert.Equal(AssistanceRequestStatus.Accepted, request.Status);
        Assert.NotNull(request.AcceptedAt);
    }

    [Fact]
    public void AssistanceRequest_Accept_ThrowsException_IfAssignedToDifferentProvider()
    {
        // Arrange
        var request = new AssistanceRequest
        {
            CustomerId = "cust-1",
            ProviderId = "prov-original",
            Status = AssistanceRequestStatus.Open
        };

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => request.Accept("prov-intruder"));
        Assert.Contains("already been accepted", ex.Message);
    }

    [Fact]
    public void AssistanceRequest_FullLifecycle_TransitionsCorrectly()
    {
        // Arrange
        var request = new AssistanceRequest
        {
            CustomerId = "cust-1",
            CustomerName = "Driver 1",
            Status = AssistanceRequestStatus.Open,
            EstimatedFare = 250m
        };

        // 1. Accept
        request.Accept("prov-1");
        Assert.Equal(AssistanceRequestStatus.Accepted, request.Status);

        // 2. En Route
        request.StartTrip();
        Assert.Equal(AssistanceRequestStatus.EnRoute, request.Status);
        Assert.NotNull(request.EnRouteAt);

        // 3. Arrived
        request.MarkArrived();
        Assert.Equal(AssistanceRequestStatus.Arrived, request.Status);
        Assert.NotNull(request.ArrivedAt);

        // 4. In Service
        request.StartService();
        Assert.Equal(AssistanceRequestStatus.InService, request.Status);
        Assert.NotNull(request.InServiceAt);

        // 5. Complete
        request.Complete(finalFare: 300m);
        Assert.Equal(AssistanceRequestStatus.Completed, request.Status);
        Assert.NotNull(request.CompletedAt);
        Assert.Equal(300m, request.FinalFare);
    }

    [Fact]
    public void AssistanceRequest_InvalidTransition_ThrowsException()
    {
        // Arrange: Cannot jump from Open directly to InService or Completed
        var request = new AssistanceRequest
        {
            Status = AssistanceRequestStatus.Open
        };

        // Act & Assert
        Assert.Throws<InvalidOperationException>(() => request.StartService());
        Assert.Throws<InvalidOperationException>(() => request.Complete());
    }

    [Fact]
    public void ProviderProfile_ToggleOnline_ThrowsIfUnverified()
    {
        // Arrange
        var profile = new ProviderProfile
        {
            UserId = "prov-1",
            VerificationStatus = VerificationStatus.Pending,
            IsOnline = false
        };

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => profile.ToggleOnline());
        Assert.Contains("pending administrative verification", ex.Message);
        Assert.False(profile.IsOnline);
    }

    [Fact]
    public void ProviderProfile_ToggleOnline_SucceedsIfVerified()
    {
        // Arrange
        var profile = new ProviderProfile
        {
            UserId = "prov-1",
            VerificationStatus = VerificationStatus.Verified,
            IsOnline = false
        };

        // Act
        profile.ToggleOnline();

        // Assert
        Assert.True(profile.IsOnline);

        // Act 2: Toggle off
        profile.ToggleOnline();
        Assert.False(profile.IsOnline);
    }

    [Fact]
    public void ProviderProfile_AddRating_CalculatesWeightedAverage()
    {
        // Arrange
        var profile = new ProviderProfile
        {
            Rating = 4.0m,
            TotalReviews = 1
        };

        // Act: add 5-star review => (4.0 * 1 + 5) / 2 = 4.5
        profile.AddRating(5);

        // Assert
        Assert.Equal(4.5m, profile.Rating);
        Assert.Equal(2, profile.TotalReviews);
    }

    [Fact]
    public async Task ProviderService_AcceptRequest_Fails_IfProviderIsOffline()
    {
        // Arrange
        var fakeProfile = new ProviderProfile
        {
            UserId = "prov-1",
            VerificationStatus = VerificationStatus.Verified,
            IsOnline = false // Offline
        };

        var fakeRequest = new AssistanceRequest
        {
            Id = 10,
            Status = AssistanceRequestStatus.Open
        };

        var service = new ProviderService(
            new FakeAssistanceRequestRepo(fakeRequest),
            new FakeProviderRepo(fakeProfile),
            new FakeUnitOfWork(),
            new FakeMapService());

        // Act
        var result = await service.AcceptRequestAsync(10, "prov-1");

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Contains("must be Online", result.Error);
    }

    [Fact]
    public async Task ProviderService_UpdateStatus_Fails_IfNotAssignedProvider()
    {
        // Arrange: Request is assigned to prov-1, prov-2 attempts to update status
        var fakeRequest = new AssistanceRequest
        {
            Id = 20,
            ProviderId = "prov-1",
            Status = AssistanceRequestStatus.Accepted
        };

        var service = new ProviderService(
            new FakeAssistanceRequestRepo(fakeRequest),
            new FakeProviderRepo(null),
            new FakeUnitOfWork(),
            new FakeMapService());

        // Act: prov-2 attempts unauthorized update
        var result = await service.UpdateStatusAsync(20, "prov-2", AssistanceRequestStatus.EnRoute);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Contains("Security violation", result.Error);
    }

    [Fact]
    public async Task ProviderService_GetEarnings_CalculatesAndFiltersCorrectly()
    {
        // Arrange
        var fakeRequests = new System.Collections.Generic.List<AssistanceRequest>
        {
            new AssistanceRequest
            {
                Id = 1,
                ProviderId = "prov-1",
                Status = AssistanceRequestStatus.Completed,
                EstimatedFare = 200m,
                FinalFare = 250m,
                IsPaid = true,
                CompletedAt = DateTime.UtcNow
            },
            new AssistanceRequest
            {
                Id = 2,
                ProviderId = "prov-1",
                Status = AssistanceRequestStatus.Completed,
                EstimatedFare = 150m,
                FinalFare = 150m,
                IsPaid = false,
                CompletedAt = DateTime.UtcNow
            }
        };

        var repo = new FakeAssistanceRequestRepo(null, fakeRequests);
        var service = new ProviderService(repo, new FakeProviderRepo(null), new FakeUnitOfWork(), new FakeMapService());

        // Act
        var earnings = await service.GetEarningsAsync("prov-1", "all");

        // Assert
        Assert.Equal(400m, earnings.TotalGrossEarnings);
        Assert.Equal(250m, earnings.PaidAmount);
        Assert.Equal(150m, earnings.PayableAmount);
        Assert.Equal(2, earnings.TotalCompletedJobs);
    }

    [Fact]
    public async Task ProviderService_GetHistory_FiltersBySearchTerm()
    {
        // Arrange
        var fakeRequests = new System.Collections.Generic.List<AssistanceRequest>
        {
            new AssistanceRequest
            {
                Id = 1,
                ProviderId = "prov-1",
                CustomerName = "Tarek Mostafa",
                Status = AssistanceRequestStatus.Completed,
                CustomerAddress = "Desert Road"
            },
            new AssistanceRequest
            {
                Id = 2,
                ProviderId = "prov-1",
                CustomerName = "Sarah Mahmoud",
                Status = AssistanceRequestStatus.Cancelled,
                CustomerAddress = "Zayed"
            }
        };

        var repo = new FakeAssistanceRequestRepo(null, fakeRequests);
        var service = new ProviderService(repo, new FakeProviderRepo(null), new FakeUnitOfWork(), new FakeMapService());

        // Act
        var results = await service.GetHistoryAsync("prov-1", null, "Zayed");

        // Assert
        Assert.Single(results);
        Assert.Equal("Sarah Mahmoud", results[0].CustomerName);
    }

    // Fakes for testing
    private class FakeAssistanceRequestRepo : IAssistanceRequestRepository
    {
        private readonly AssistanceRequest? _request;
        private readonly System.Collections.Generic.List<AssistanceRequest> _requests;

        public FakeAssistanceRequestRepo(AssistanceRequest? request = null, System.Collections.Generic.List<AssistanceRequest>? requests = null)
        {
            _request = request;
            _requests = requests ?? new System.Collections.Generic.List<AssistanceRequest>();
        }

        public Task<AssistanceRequest?> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
            Task.FromResult(_request);

        public Task<AssistanceRequest?> GetActiveRequestForProviderAsync(string providerId, CancellationToken cancellationToken = default) =>
            Task.FromResult<AssistanceRequest?>(null);

        public Task<System.Collections.Generic.IReadOnlyList<AssistanceRequest>> GetAvailableRequestsForProviderAsync(string? providerId, AssistanceType? serviceType, CancellationToken cancellationToken = default) =>
            Task.FromResult<System.Collections.Generic.IReadOnlyList<AssistanceRequest>>(_requests);

        public Task<System.Collections.Generic.IReadOnlyList<AssistanceRequest>> GetHistoryForProviderAsync(string providerId, AssistanceRequestStatus? statusFilter = null, CancellationToken cancellationToken = default) =>
            Task.FromResult<System.Collections.Generic.IReadOnlyList<AssistanceRequest>>(_requests);

        public Task<System.Collections.Generic.IReadOnlyList<AssistanceRequest>> GetAllRequestsForProviderAsync(string providerId, CancellationToken cancellationToken = default) =>
            Task.FromResult<System.Collections.Generic.IReadOnlyList<AssistanceRequest>>(_requests);

        public Task AddAsync(AssistanceRequest request, CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task UpdateAsync(AssistanceRequest request, CancellationToken cancellationToken = default) => Task.CompletedTask;
    }

    private class FakeProviderRepo : IProviderRepository
    {
        private readonly ProviderProfile? _profile;

        public FakeProviderRepo(ProviderProfile? profile) => _profile = profile;

        public Task<ApplicationUser?> GetByIdAsync(string id, CancellationToken cancellationToken = default) =>
            Task.FromResult<ApplicationUser?>(new ApplicationUser { Id = id, FullName = "Test Provider", Role = UserRole.Provider });

        public Task<System.Collections.Generic.IReadOnlyList<ApplicationUser>> GetActiveProvidersAsync(CancellationToken cancellationToken = default) =>
            Task.FromResult<System.Collections.Generic.IReadOnlyList<ApplicationUser>>(new System.Collections.Generic.List<ApplicationUser>());

        public Task<ProviderProfile?> GetProfileByUserIdAsync(string userId, CancellationToken cancellationToken = default) =>
            Task.FromResult(_profile);

        public Task AddProfileAsync(ProviderProfile profile, CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task UpdateProfileAsync(ProviderProfile profile, CancellationToken cancellationToken = default) => Task.CompletedTask;
    }

    private class FakeUnitOfWork : IUnitOfWork
    {
        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) => Task.FromResult(1);
        public Task BeginTransactionAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task CommitTransactionAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task RollbackTransactionAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;
        public void Dispose() { }
    }

    private class FakeMapService : IMapService
    {
        public Task<double> CalculateDistanceKmAsync(GeoPoint origin, GeoPoint destination, CancellationToken cancellationToken = default) => Task.FromResult(5.0);
        public Task<int> EstimateEtaMinutesAsync(GeoPoint origin, GeoPoint destination, CancellationToken cancellationToken = default) => Task.FromResult(10);
        public Task<string> ReverseGeocodeAsync(double latitude, double longitude, CancellationToken cancellationToken = default) => Task.FromResult("Desert Road Km 28");
    }
}
