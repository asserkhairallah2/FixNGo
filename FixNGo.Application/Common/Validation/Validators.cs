using FluentValidation;
using FixNGo.Application.Features.Provider;

namespace FixNGo.Application.Common.Validation;

public class UpdateProviderProfileDtoValidator : AbstractValidator<UpdateProviderProfileDto>
{
    public UpdateProviderProfileDtoValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Full Name is required.")
            .Length(3, 100).WithMessage("Full Name must be between 3 and 100 characters.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^(01[0125][0-9]{8}|\+201[0125][0-9]{8})$").WithMessage("Please enter a valid Egyptian mobile number (e.g. 01012345678).");

        RuleFor(x => x.City)
            .NotEmpty().WithMessage("City / Operating Region is required.")
            .MaximumLength(100).WithMessage("City cannot exceed 100 characters.");

        RuleFor(x => x.NationalId)
            .Matches(@"^[0-9]{14}$").When(x => !string.IsNullOrEmpty(x.NationalId))
            .WithMessage("Egyptian National ID must be exactly 14 digits.");
    }
}

public class BookingValidationModel
{
    public int ServiceCenterId { get; set; }
    public int ServiceId { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public DateOnly AppointmentDate { get; set; }
    public TimeSpan AppointmentTime { get; set; }
    public decimal Price { get; set; }
    public string? Notes { get; set; }
}

public class BookingValidationModelValidator : AbstractValidator<BookingValidationModel>
{
    public BookingValidationModelValidator()
    {
        RuleFor(x => x.ServiceCenterId)
            .GreaterThan(0).WithMessage("A valid Service Center must be selected.");

        RuleFor(x => x.ServiceId)
            .GreaterThan(0).WithMessage("Please select a maintenance/repair service.");

        RuleFor(x => x.AppointmentDate)
            .Must(d => d >= DateOnly.FromDateTime(DateTime.Today))
            .WithMessage("Appointment Date cannot be in the past.");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Service price must be greater than 0 EGP.");

        RuleFor(x => x.Notes)
            .MaximumLength(500).WithMessage("Notes cannot exceed 500 characters.");
    }
}
