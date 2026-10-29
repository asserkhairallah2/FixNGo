using System.Threading.Tasks;
using FixNGo.Domain.Entities;
using FixNGo.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FixNGo.Web.Controllers;

public class AccountController : Controller
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpGet]
    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(string email, string password, bool rememberMe, string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            ModelState.AddModelError(string.Empty, "Email and password are required.");
            return View();
        }

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null || !user.IsActive)
        {
            ModelState.AddModelError(string.Empty, "Invalid login attempt or account is inactive.");
            return View();
        }

        var result = await _signInManager.PasswordSignInAsync(user, password, rememberMe, lockoutOnFailure: false);
        if (result.Succeeded)
        {
            if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                return Redirect(returnUrl);

            return user.Role switch
            {
                UserRole.Provider => RedirectToAction("Dashboard", "Provider"),
                UserRole.ServiceCenter => RedirectToAction("Index", "ServiceCenters"),
                _ => RedirectToAction("Index", "Home")
            };
        }

        ModelState.AddModelError(string.Empty, "Invalid username or password.");
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public async Task<IActionResult> QuickLogin(string role = "Provider")
    {
        string email = role.ToLowerInvariant() switch
        {
            "provider" => "provider@fixngo.com",
            "customer" => "customer@fixngo.com",
            "admin" => "admin@fixngo.com",
            _ => "provider@fixngo.com"
        };

        var user = await _userManager.FindByEmailAsync(email);
        if (user != null)
        {
            await _signInManager.SignInAsync(user, isPersistent: true);
            if (user.Role == UserRole.Provider)
                return RedirectToAction("Dashboard", "Provider");
            if (user.Role == UserRole.ServiceCenter)
                return RedirectToAction("Index", "ServiceCenters");
        }

        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public IActionResult AccessDenied()
    {
        return View();
    }
}
