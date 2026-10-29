namespace FixNGo.Web.Models;

/// <summary>
/// View model for the Service Center Profile page.
/// Used for viewing and editing service center contact, location, and status details.
/// </summary>
public class CenterProfileViewModel
{
    public int Id { get; set; } = 1;
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsVerified { get; set; } = true;
}
