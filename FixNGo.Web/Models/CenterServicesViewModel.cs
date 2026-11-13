using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
    [Required(ErrorMessage = "Service name is required.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Service name must be between 3 and 100 characters.")]
    public string Name { get; set; } = string.Empty;

    [StringLength(300, ErrorMessage = "Description cannot exceed 300 characters.")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "Price is required.")]
    [Range(1, 50000, ErrorMessage = "Price must be between 1 and 50,000 EGP.")]
    public decimal Price { get; set; }

    public bool IsAvailable { get; set; } = true;

    [StringLength(50, ErrorMessage = "Offer text cannot exceed 50 characters.")]
    public string? Offer { get; set; }
}

/// <summary>
/// View model for the complete Center Services & Prices management page.
/// </summary>
public class CenterServicesViewModel
{
    public int CenterId { get; set; } = 1;
    public string CenterName { get; set; } = "FixNGo Certified Center";
    public List<ServiceItemViewModel> Services { get; set; } = new();
    public AddServiceInputModel NewService { get; set; } = new();
}
