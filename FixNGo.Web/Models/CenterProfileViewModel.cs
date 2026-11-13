using System.ComponentModel.DataAnnotations;

namespace FixNGo.Web.Models;

/// <summary>
/// View model for the Service Center Profile page.
/// Used for viewing and editing service center contact, location, and status details.
/// </summary>
public class CenterProfileViewModel
{
    public int Id { get; set; } = 1;

    [Required(ErrorMessage = "Center name is required.")]
    [StringLength(150, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 150 characters.")]
    [Display(Name = "Center Name")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone number is required.")]
    [Phone(ErrorMessage = "Invalid phone number.")]
    [Display(Name = "Phone Number")]
    public string Phone { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    [Display(Name = "Contact Email")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Physical address is required.")]
    [StringLength(250, ErrorMessage = "Address cannot exceed 250 characters.")]
    [Display(Name = "Full Address")]
    public string Address { get; set; } = string.Empty;

    [Display(Name = "Latitude")]
    public double Latitude { get; set; }

    [Display(Name = "Longitude")]
    public double Longitude { get; set; }

    public bool IsActive { get; set; } = true;
    public bool IsVerified { get; set; } = true;
}
