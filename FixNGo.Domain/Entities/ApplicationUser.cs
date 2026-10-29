using System;
using FixNGo.Domain.Common;
using FixNGo.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace FixNGo.Domain.Entities;

/// <summary>
/// Application user account extending ASP.NET Core Identity.
/// </summary>
public class ApplicationUser : IdentityUser, IAuditableEntity, ISoftDeletable
{
    public string FullName { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Customer;

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public bool IsDeleted { get; set; } = false;

    public DateTime? DeletedAt { get; set; }

}

