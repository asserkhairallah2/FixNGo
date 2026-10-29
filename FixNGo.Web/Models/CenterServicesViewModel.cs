using System.Collections.Generic;

namespace FixNGo.Web.Models;

/// <summary>
/// Represents a single automotive repair or maintenance service item.
/// </summary>
public class ServiceItemViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public string? Offer { get; set; }
}

/// <summary>
/// Input model for adding a new service from the UI form.
/// </summary>
public class AddServiceInputModel
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; } = true;
    public string? Offer { get; set; }
}

/// <summary>
/// View model for the complete Center Services & Prices management page.
/// </summary>
public class CenterServicesViewModel
{
    public int CenterId { get; set; } = 1;
    public string CenterName { get; set; } = "Al-Nasr Certified Service Center";
    public List<ServiceItemViewModel> Services { get; set; } = new();
    public AddServiceInputModel NewService { get; set; } = new();
}
