using System.Collections.Generic;
using FixNGo.Application.Common.Mappings;

namespace FixNGo.Web.Models;

public class ServiceCenterIndexViewModel
{
    public List<ServiceCenterDto> Items { get; set; } = new();
    public string? Search { get; set; }
    public string? City { get; set; }
    public string? SortOrder { get; set; }

    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 6;
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }

    public List<string> AvailableCities { get; set; } = new();
}
