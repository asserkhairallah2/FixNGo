using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FixNGo.Application.Abstractions.Persistence;
using FixNGo.Domain.Common;
using FixNGo.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FixNGo.Infrastructure.Persistence;

/// <summary>
/// Entity Framework Core database context for FixNGo platform.
/// Extends IdentityDbContext for ASP.NET Core Identity authentication and authorization.
/// </summary>
public class AppDbContext : IdentityDbContext<ApplicationUser>, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Service Centers Module DbSets
    public DbSet<ServiceCenter> ServiceCenters => Set<ServiceCenter>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<WorkingHours> WorkingHours => Set<WorkingHours>();

    // Provider / Roadside Assistance Module DbSets
    public DbSet<ProviderProfile> ProviderProfiles => Set<ProviderProfile>();
    public DbSet<AssistanceRequest> AssistanceRequests => Set<AssistanceRequest>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // 1. Configure Identity table mappings and schema
        base.OnModelCreating(builder);

        // 2. Automatically discover and apply all IEntityTypeConfiguration<T> in this assembly
        builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // 3. Configure global query filters for soft deletion
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDeletable).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "e");
                var property = Expression.Property(parameter, nameof(ISoftDeletable.IsDeleted));
                var falseConstant = Expression.Constant(false);
                var filter = Expression.Lambda(Expression.Equal(property, falseConstant), parameter);

                builder.Entity(entityType.ClrType).HasQueryFilter(filter);
            }
        }
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Automatically handle audit timestamps and soft deletion
        foreach (var entry in ChangeTracker.Entries<IAuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    break;
            }
        }

        foreach (var entry in ChangeTracker.Entries<ISoftDeletable>())
        {
            if (entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                entry.Entity.IsDeleted = true;
                entry.Entity.DeletedAt = DateTime.UtcNow;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
