using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace FixNGo.Infrastructure.Persistence;

/// <summary>
/// Seeds initial platform roles, admin user, demo provider, and foundational requests during application startup.
/// </summary>
public static class DbInitializer
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
        var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
        var logger = scope.ServiceProvider.GetService<ILogger<AppDbContext>>();

        try
        {
            try
            {
                // 0. Apply any pending EF Core migrations automatically
                await context.Database.MigrateAsync();
            }
            catch (Exception migEx)
            {
                logger?.LogWarning(migEx, "Database.MigrateAsync encountered an issue. Falling back to EnsureCreatedAsync.");
                await context.Database.EnsureCreatedAsync();
            }

            // 1. Seed Roles
            if (roleManager != null)
            {
                foreach (var roleName in Enum.GetNames<UserRole>())
                {
                    if (!await roleManager.RoleExistsAsync(roleName))
                    {
                        await roleManager.CreateAsync(new IdentityRole(roleName));
                    }
                }
            }

            // 2. Seed Admin User
            if (userManager != null)
            {
                var adminEmail = "admin@fixngo.com";
                var admin = await userManager.FindByEmailAsync(adminEmail);
                if (admin == null)
                {
                    admin = new ApplicationUser
                    {
                        UserName = adminEmail,
                        Email = adminEmail,
                        FullName = "System Administrator",
                        Role = UserRole.Admin,
                        EmailConfirmed = true,
                        IsActive = true
                    };

                    var result = await userManager.CreateAsync(admin, "Admin@123456");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(admin, UserRole.Admin.ToString());
                    }
                }

                // 3. Seed Demo Provider User & Profile
                var providerEmail = "provider@fixngo.com";
                var provider = await userManager.FindByEmailAsync(providerEmail);
                if (provider == null)
                {
                    provider = new ApplicationUser
                    {
                        UserName = providerEmail,
                        Email = providerEmail,
                        FullName = "Capt. Mohamed Mansour",
                        PhoneNumber = "01012345678",
                        Role = UserRole.Provider,
                        EmailConfirmed = true,
                        PhoneNumberConfirmed = true,
                        IsActive = true
                    };

                    var result = await userManager.CreateAsync(provider, "Provider@123456");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(provider, UserRole.Provider.ToString());
                    }
                }

                if (provider != null)
                {
                    var profile = await context.ProviderProfiles.FirstOrDefaultAsync(p => p.UserId == provider.Id);
                    if (profile == null)
                    {
                        profile = new ProviderProfile
                        {
                            UserId = provider.Id,
                            PrimaryServiceType = AssistanceType.Mechanic,
                            IsOnline = true,
                            VerificationStatus = VerificationStatus.Verified,
                            Rating = 4.9m,
                            TotalReviews = 24,
                            CompletedJobsCount = 38,
                            NationalId = "29010151234567",
                            DriverLicenseNumber = "DL-882941",
                            VehiclePlateNumber = "ق أ ج 4921",
                            City = "Cairo - Desert Road & 6th of October",
                            Bio = "Certified mobile automotive specialist and recovery operator with 8+ years experience in rapid highway roadside assistance."
                        };
                        await context.ProviderProfiles.AddAsync(profile);
                        await context.SaveChangesAsync();
                    }

                    // 4. Seed Demo Customer
                    var customerEmail = "customer@fixngo.com";
                    var customer = await userManager.FindByEmailAsync(customerEmail);
                    if (customer == null)
                    {
                        customer = new ApplicationUser
                        {
                            UserName = customerEmail,
                            Email = customerEmail,
                            FullName = "Tarek Mostafa",
                            PhoneNumber = "01234567890",
                            Role = UserRole.Customer,
                            EmailConfirmed = true,
                            IsActive = true
                        };
                        var res = await userManager.CreateAsync(customer, "Customer@123456");
                        if (res.Succeeded)
                        {
                            await userManager.AddToRoleAsync(customer, UserRole.Customer.ToString());
                        }
                    }

                    // 5. Seed Assistance Requests if empty
                    if (!await context.AssistanceRequests.AnyAsync())
                    {
                        var sampleRequests = new List<AssistanceRequest>
                        {
                            // 5.1 Active Request (EnRoute)
                            new AssistanceRequest
                            {
                                CustomerId = customer?.Id ?? "cust-1",
                                CustomerName = "Hany Adel",
                                CustomerPhone = "01122334455",
                                ProviderId = provider.Id,
                                ServiceType = AssistanceType.Mechanic,
                                ProblemDescription = "Engine overheated abruptly on desert road, smoke coming from radiator cap.",
                                Status = AssistanceRequestStatus.EnRoute,
                                CustomerAddress = "Cairo-Alexandria Desert Road, Km 32",
                                CustomerLatitude = 30.0821,
                                CustomerLongitude = 31.0124,
                                ProviderLatitude = 30.0650,
                                ProviderLongitude = 30.9980,
                                EstimatedFare = 320.00m,
                                VehicleInfo = "Hyundai Elantra 2022 - Silver",
                                VehiclePlateNumber = "أ ب ج 1234",
                                IsP0Emergency = false,
                                AcceptedAt = DateTime.UtcNow.AddMinutes(-15),
                                EnRouteAt = DateTime.UtcNow.AddMinutes(-10),
                                CreatedAt = DateTime.UtcNow.AddMinutes(-20)
                            },
                            // 5.2 Incoming Open Request (Emergency P0)
                            new AssistanceRequest
                            {
                                CustomerId = customer?.Id ?? "cust-1",
                                CustomerName = "Sarah Mahmoud",
                                CustomerPhone = "01099887766",
                                ServiceType = AssistanceType.TireService,
                                ProblemDescription = "Severe tire blowout on fast lane shoulder, need immediate wheel replacement.",
                                Status = AssistanceRequestStatus.Open,
                                CustomerAddress = "Cairo-Alexandria Desert Road, Km 26 (Near Toll Station)",
                                CustomerLatitude = 30.0520,
                                CustomerLongitude = 30.9850,
                                EstimatedFare = 200.00m,
                                VehicleInfo = "Kia Sportage 2020 - White",
                                VehiclePlateNumber = "س ر هـ 5678",
                                IsP0Emergency = true,
                                CreatedAt = DateTime.UtcNow.AddMinutes(-5)
                            },
                            // 5.3 Incoming Open Request (Standard)
                            new AssistanceRequest
                            {
                                CustomerId = customer?.Id ?? "cust-1",
                                CustomerName = "Omar Khaled",
                                CustomerPhone = "01511223344",
                                ServiceType = AssistanceType.BatteryService,
                                ProblemDescription = "Car battery completely drained after parking with headlights on.",
                                Status = AssistanceRequestStatus.Open,
                                CustomerAddress = "Sheikh Zayed Entrance, Hyper One Axis",
                                CustomerLatitude = 30.0210,
                                CustomerLongitude = 30.9700,
                                EstimatedFare = 150.00m,
                                VehicleInfo = "Toyota Corolla 2023 - Grey",
                                VehiclePlateNumber = "ط ي ت 9988",
                                IsP0Emergency = false,
                                CreatedAt = DateTime.UtcNow.AddMinutes(-12)
                            },
                            // 5.4 Completed & Paid Request
                            new AssistanceRequest
                            {
                                CustomerId = customer?.Id ?? "cust-1",
                                CustomerName = "Mahmoud Nour",
                                CustomerPhone = "01233445566",
                                ProviderId = provider.Id,
                                ServiceType = AssistanceType.Mechanic,
                                ProblemDescription = "Alternator belt snapped while driving.",
                                Status = AssistanceRequestStatus.Paid,
                                CustomerAddress = "6th of October Industrial Zone 3",
                                CustomerLatitude = 29.9500,
                                CustomerLongitude = 30.9200,
                                EstimatedFare = 280.00m,
                                FinalFare = 300.00m,
                                VehicleInfo = "Nissan Sunny 2019 - Black",
                                VehiclePlateNumber = "ن س ن 4321",
                                IsP0Emergency = false,
                                PaymentMethod = "Cash",
                                IsPaid = true,
                                Rating = 5,
                                ReviewText = "Excellent technician! Arrived in 12 minutes on the highway and repaired the belt quickly.",
                                AcceptedAt = DateTime.UtcNow.AddDays(-1).AddMinutes(-40),
                                CompletedAt = DateTime.UtcNow.AddDays(-1),
                                PaidAt = DateTime.UtcNow.AddDays(-1),
                                CreatedAt = DateTime.UtcNow.AddDays(-1).AddMinutes(-45)
                            },
                            // 5.5 Completed & Payable (Pending Settlement)
                            new AssistanceRequest
                            {
                                CustomerId = customer?.Id ?? "cust-1",
                                CustomerName = "Ahmed Sami",
                                CustomerPhone = "01055667788",
                                ProviderId = provider.Id,
                                ServiceType = AssistanceType.Mechanic,
                                ProblemDescription = "Brake fluid pressure failure.",
                                Status = AssistanceRequestStatus.Completed,
                                CustomerAddress = "Desert Road Toll Station Km 28",
                                CustomerLatitude = 30.0600,
                                CustomerLongitude = 30.9900,
                                EstimatedFare = 450.00m,
                                FinalFare = 450.00m,
                                VehicleInfo = "Mercedes C180 2018 - Blue",
                                VehiclePlateNumber = "م ر س 7777",
                                IsP0Emergency = false,
                                PaymentMethod = "Online",
                                IsPaid = false,
                                Rating = 5,
                                ReviewText = "Very professional and safe equipment handling.",
                                AcceptedAt = DateTime.UtcNow.AddHours(-4),
                                CompletedAt = DateTime.UtcNow.AddHours(-3),
                                CreatedAt = DateTime.UtcNow.AddHours(-4).AddMinutes(-10)
                            },
                            // 5.6 Cancelled Request
                            new AssistanceRequest
                            {
                                CustomerId = customer?.Id ?? "cust-1",
                                CustomerName = "Kareem Fathy",
                                CustomerPhone = "01188776655",
                                ProviderId = provider.Id,
                                ServiceType = AssistanceType.FuelDelivery,
                                ProblemDescription = "Out of fuel.",
                                Status = AssistanceRequestStatus.Cancelled,
                                CustomerAddress = "Ring Road - Mehwar Intersection",
                                CustomerLatitude = 30.0350,
                                CustomerLongitude = 31.0500,
                                EstimatedFare = 120.00m,
                                VehicleInfo = "Renault Megane 2021 - Red",
                                VehiclePlateNumber = "ر ن و 1122",
                                CancellationReason = "Customer was able to get fuel from nearby fuel station.",
                                CancelledAt = DateTime.UtcNow.AddDays(-2),
                                CreatedAt = DateTime.UtcNow.AddDays(-2).AddMinutes(-20)
                            }
                        };

                        await context.AssistanceRequests.AddRangeAsync(sampleRequests);
                        await context.SaveChangesAsync();
                    }
                }
            }
        }
        catch (Exception ex)
        {
            logger?.LogWarning(ex, "DbInitializer could not complete database seeding.");
        }
    }
}
