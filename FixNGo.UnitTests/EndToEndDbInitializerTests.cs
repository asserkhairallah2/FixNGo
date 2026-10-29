using System;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Xunit;
using Xunit.Abstractions;

namespace FixNGo.UnitTests;

public class EndToEndDbInitializerTests
{
    private readonly ITestOutputHelper _output;

    public EndToEndDbInitializerTests(ITestOutputHelper output)
    {
        _output = output;
    }

    [Fact]
    public async Task TestFullSeedingFlow()
    {
        var dbName = "FixNGo_SeedTestDb";
        var cs = $"Server=(localdb)\\mssqllocaldb;Database={dbName};Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;";

        var services = new ServiceCollection();
        services.AddLogging();

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(cs, sqlOptions =>
            {
                sqlOptions.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
            });
        });

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 6;
        })
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

        var serviceProvider = services.BuildServiceProvider();

        using (var scope = serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await context.Database.EnsureDeletedAsync();
            _output.WriteLine($"Cleaned previous {dbName} if existed.");

            // Apply migrations
            await context.Database.MigrateAsync();
            _output.WriteLine("Migrations applied successfully!");

            // Run DbInitializer
            await DbInitializer.SeedAsync(serviceProvider);
            _output.WriteLine("DbInitializer.SeedAsync completed successfully!");

            // Verify seeded data
            var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "admin@fixngo.com");
            Assert.NotNull(adminUser);
            _output.WriteLine($"Found seeded admin: {adminUser.Email}");

            var providerUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "provider@fixngo.com");
            Assert.NotNull(providerUser);
            _output.WriteLine($"Found seeded provider: {providerUser.Email}");

            var providerProfile = await context.ProviderProfiles.FirstOrDefaultAsync(p => p.UserId == providerUser.Id);
            Assert.NotNull(providerProfile);
            _output.WriteLine($"Found seeded provider profile: Rating={providerProfile.Rating}, VerificationStatus={providerProfile.VerificationStatus}");

            var requestCount = await context.AssistanceRequests.CountAsync();
            _output.WriteLine($"Found seeded assistance requests: {requestCount}");
            Assert.True(requestCount > 0);

            // Verify query with soft delete filter on ServiceCenters, Services, and WorkingHours
            var centers = await context.ServiceCenters
                .Include(sc => sc.Services)
                .Include(sc => sc.WorkingHours)
                .ToListAsync();
            _output.WriteLine($"Queried ServiceCenters successfully without any SqlException! (Count: {centers.Count})");

            // Clean up
            await context.Database.EnsureDeletedAsync();
            _output.WriteLine($"Cleaned up {dbName}.");
        }
    }
}
