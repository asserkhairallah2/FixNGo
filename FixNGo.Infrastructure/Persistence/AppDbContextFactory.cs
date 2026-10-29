using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FixNGo.Infrastructure.Persistence;

/// <summary>
/// Design-time factory for EF Core migrations when running 'dotnet ef migrations' from CLI or Visual Studio PMC.
/// Resolves DbContextOptions and isolates design-time schema creation from runtime dependency injection.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        var connectionString = "Server=(localdb)\\mssqllocaldb;Database=FixNGoDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True";

        optionsBuilder.UseSqlServer(connectionString, b =>
        {
            b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
        });

        return new AppDbContext(optionsBuilder.Options);
    }
}

