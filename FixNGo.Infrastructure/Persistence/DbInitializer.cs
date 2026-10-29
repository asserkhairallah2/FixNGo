using System;
using System.Threading.Tasks;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace FixNGo.Infrastructure.Persistence;

/// <summary>
/// Seeds initial platform roles, admin user, and foundational data during application startup.
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
            await context.Database.EnsureCreatedAsync();

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
            }
        }
        catch (Exception ex)
        {
            logger?.LogWarning(ex, "DbInitializer could not complete database seeding.");
        }
    }
}

