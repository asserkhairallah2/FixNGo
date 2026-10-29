using System;
using FixNGo.Application.Abstractions.Integrations;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Application.Features.Assistance;
using FixNGo.Application.Features.Provider;
using FixNGo.Domain.Entities;
using FixNGo.Infrastructure.Integrations;
using FixNGo.Infrastructure.Persistence;
using FixNGo.Infrastructure.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FixNGo.Infrastructure;

public static class DependencyInjection
{
    /// <summary>
    /// Registers all Infrastructure layer services including SQL Server DbContext, Unit of Work,
    /// Repositories, Identity services, and external integration adapters.
    /// </summary>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. Persistence - SQL Server DbContext Configuration
        string connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? "Server=(localdb)\\mssqllocaldb;Database=FixNGo_UniversityDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True";

        services.AddDbContext<AppDbContext>((serviceProvider, options) =>
        {
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
            });
        });

        services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());
        services.AddScoped<IUnitOfWork, EfUnitOfWork>();

        // 2. Repositories Registration
        services.AddScoped<IProviderRepository, ProviderRepository>();
        services.AddScoped<IServiceCenterRepository, ServiceCenterRepository>();
        services.AddScoped<IBookingRepository, BookingRepository>();
        services.AddScoped<IAssistanceRequestRepository, AssistanceRequestRepository>();
        services.AddScoped<IVehicleRepository, VehicleRepository>();

        // 3. Identity Password Hasher
        services.AddScoped<IPasswordHasher<ApplicationUser>, PasswordHasher<ApplicationUser>>();

        // 4. Integrations
        services.AddSingleton<IMapService, GoogleMapsAdapter>();

        // 5. Application Services
        services.AddScoped<IProviderMatchingService, ProviderMatchingService>();
        services.AddScoped<IProviderService, ProviderService>();

        return services;
    }

    /// <summary>
    /// Backward-compatible alias for AddInfrastructure.
    /// </summary>
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        => services.AddInfrastructure(configuration);
}

