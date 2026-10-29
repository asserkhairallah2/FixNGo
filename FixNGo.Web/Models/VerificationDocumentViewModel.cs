using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace FixNGo.Web.Models;

/// <summary>
/// Status of verification document in the approval lifecycle.
/// </summary>
public enum DocumentStatus
{
    Pending,
    Approved,
    Rejected
}

/// <summary>
/// Represents a single compliance/verification document item with bilingual details.
/// </summary>
public class VerificationDocumentItem
{
    public int Id { get; set; }
    public string DocumentType { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FileSize { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; }
    public DocumentStatus Status { get; set; }
    public string? RejectionReason { get; set; }
}

/// <summary>
/// Input model for simulating document file upload in the UI.
/// </summary>
public class UploadDocumentInputModel
{
    public string DocumentType { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public IFormFile? File { get; set; }
}

/// <summary>
/// View model for the complete Verification Documents page.
/// </summary>
public class VerificationDocumentsViewModel
{
    public int CenterId { get; set; } = 1;
    public string CenterName { get; set; } = string.Empty;
    public List<VerificationDocumentItem> Documents { get; set; } = new();
    public UploadDocumentInputModel NewDocument { get; set; } = new();
}
