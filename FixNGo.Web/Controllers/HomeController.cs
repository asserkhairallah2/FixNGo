using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace FixNGo.Web.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error(int? statusCode = null)
    {
        // Determine the type of error for the view
        var effectiveCode = statusCode
            ?? HttpContext.Response.StatusCode;

        ViewData["StatusCode"] = effectiveCode;
        ViewData["IsNotFound"] = effectiveCode == 404;
        ViewData["ErrorPath"] = HttpContext
            .Features.Get<IStatusCodeReExecuteFeature>()?.OriginalPath
            ?? HttpContext.Request.Path.Value;

        return View();
    }
}
