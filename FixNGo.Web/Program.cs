using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using FixNGo.Infrastructure;
using FixNGo.Infrastructure.Persistence;
using FixNGo.Web.Hubs;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Infrastructure & Application Services (Clean Architecture Composition Root)
builder.Services.AddInfrastructure(builder.Configuration);

// 2. Configure ASP.NET Core Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// 3. Configure Cookie Security
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.SlidingExpiration = true;
});

// 4. Policy-Based Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CustomerOnly", policy => policy.RequireRole(UserRole.Customer.ToString()));
    options.AddPolicy("ProviderOnly", policy => policy.RequireRole(UserRole.Provider.ToString()));
    options.AddPolicy("ServiceCenterOnly", policy => policy.RequireRole(UserRole.ServiceCenter.ToString()));
    options.AddPolicy("AdminOnly", policy => policy.RequireRole(UserRole.Admin.ToString()));
});

// 5. MVC Controllers with Razor Views, RuntimeCompilation, and SignalR
builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation(); // views hot-reload without full rebuild
builder.Services.AddSignalR();

var app = builder.Build();

// 6. Seed Database
try
{
    await DbInitializer.SeedAsync(app.Services);
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogWarning(ex, "Could not run DbInitializer (e.g. database server not running).");
}

// 7. HTTP Request Pipeline
// Always use a friendly error page — prevents raw exception dumps in all environments
app.UseExceptionHandler("/Home/Error");
app.UseStatusCodePagesWithReExecute("/Home/Error", "?statusCode={0}");

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// 8. Endpoints: Conventional MVC Views + Attribute-Routed APIs + SignalR Hubs
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // Enables API controllers ([ApiController]) alongside MVC views

app.MapHub<TrackHub>("/hubs/track");
app.MapHub<ChatHub>("/hubs/chat");

app.Run();


