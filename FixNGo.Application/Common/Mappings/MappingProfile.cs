using AutoMapper;
using FixNGo.Application.Features.Provider;
using FixNGo.Domain.Entities;

namespace FixNGo.Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // 1. AssistanceRequest Mappings
        CreateMap<AssistanceRequest, ProviderRequestSummaryDto>()
            .ForMember(dest => dest.DistanceKm, opt => opt.Ignore());

        CreateMap<AssistanceRequest, ProviderRequestDetailsDto>()
            .ForMember(dest => dest.CanAccept, opt => opt.MapFrom(src => src.Status == Domain.Enums.AssistanceRequestStatus.Open))
            .ForMember(dest => dest.CanReject, opt => opt.MapFrom(src => src.Status == Domain.Enums.AssistanceRequestStatus.Open || src.Status == Domain.Enums.AssistanceRequestStatus.Accepted))
            .ForMember(dest => dest.CanManage, opt => opt.MapFrom(src => src.Status != Domain.Enums.AssistanceRequestStatus.Completed && src.Status != Domain.Enums.AssistanceRequestStatus.Cancelled));

        CreateMap<AssistanceRequest, ProviderActiveRequestDto>();

        CreateMap<AssistanceRequest, ProviderHistoryItemDto>()
            .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.CreatedAt))
            .ForMember(dest => dest.Fare, opt => opt.MapFrom(src => src.FinalFare ?? src.EstimatedFare));

        // 2. ProviderProfile Mappings
        CreateMap<ProviderProfile, ProviderProfileDto>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User != null ? src.User.FullName : string.Empty))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User != null ? src.User.Email : string.Empty))
            .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.User != null ? src.User.PhoneNumber : string.Empty));

        CreateMap<UpdateProviderProfileDto, ProviderProfile>()
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.Rating, opt => opt.Ignore())
            .ForMember(dest => dest.TotalReviews, opt => opt.Ignore())
            .ForMember(dest => dest.CompletedJobsCount, opt => opt.Ignore());

        // 3. Service Center & Services Mappings
        CreateMap<ServiceCenter, ServiceCenterDto>()
            .ForMember(dest => dest.IsVerified, opt => opt.MapFrom(src => src.VerificationStatus == Domain.Enums.VerificationStatus.Verified))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User != null ? src.User.Email : "contact@fixngo.eg"))
            .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Address.Contains("Giza") ? "Giza" : src.Address.Contains("Alex") ? "Alexandria" : "Cairo"));

        CreateMap<Service, ServiceDto>()
            .ForMember(dest => dest.IsAvailable, opt => opt.MapFrom(src => src.IsActive));

        // 4. Booking Mappings
        CreateMap<Booking, BookingDto>()
            .ForMember(dest => dest.ServiceCenterName, opt => opt.MapFrom(src => src.ServiceCenter != null ? src.ServiceCenter.Name : string.Empty))
            .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.Service != null ? src.Service.Name : string.Empty))
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer != null ? src.Customer.FullName : string.Empty));
    }
}

public class ServiceCenterDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public decimal Rating { get; set; }
    public int TotalReviews { get; set; }
    public bool IsActive { get; set; }
    public bool IsVerified { get; set; }
    public List<ServiceDto> Services { get; set; } = new();
}

public class ServiceDto
{
    public int Id { get; set; }
    public int ServiceCenterId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int EstimatedDurationMinutes { get; set; }
    public bool IsAvailable { get; set; }
}

public class BookingDto
{
    public int Id { get; set; }
    public int ServiceCenterId { get; set; }
    public string ServiceCenterName { get; set; } = string.Empty;
    public string CustomerId { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public int ServiceId { get; set; }
    public string ServiceName { get; set; } = string.Empty;
    public DateOnly AppointmentDate { get; set; }
    public TimeSpan AppointmentTime { get; set; }
    public Domain.Enums.BookingStatus Status { get; set; }
    public decimal Price { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
}
