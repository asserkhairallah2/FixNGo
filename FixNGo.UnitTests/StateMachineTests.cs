using FixNGo.Domain.Enums;
using FixNGo.Domain.Rules;
using Xunit;

namespace FixNGo.UnitTests;

public class StateMachineTests
{
    [Theory]
    [InlineData(AssistanceRequestStatus.Open, AssistanceRequestStatus.Accepted, true)]
    [InlineData(AssistanceRequestStatus.Open, AssistanceRequestStatus.Cancelled, true)]
    [InlineData(AssistanceRequestStatus.Accepted, AssistanceRequestStatus.EnRoute, true)]
    [InlineData(AssistanceRequestStatus.EnRoute, AssistanceRequestStatus.Arrived, true)]
    [InlineData(AssistanceRequestStatus.Arrived, AssistanceRequestStatus.InService, true)]
    [InlineData(AssistanceRequestStatus.InService, AssistanceRequestStatus.Completed, true)]
    [InlineData(AssistanceRequestStatus.Completed, AssistanceRequestStatus.Paid, true)]
    [InlineData(AssistanceRequestStatus.Completed, AssistanceRequestStatus.Cancelled, false)] // Cannot cancel completed
    [InlineData(AssistanceRequestStatus.Paid, AssistanceRequestStatus.Open, false)]
    [InlineData(AssistanceRequestStatus.Cancelled, AssistanceRequestStatus.Accepted, false)]
    [InlineData(AssistanceRequestStatus.Open, AssistanceRequestStatus.InService, false)] // Skipping stages is forbidden
    public void AssistanceRequestStateMachine_ValidatesTransitionsCorrectly(
        AssistanceRequestStatus current,
        AssistanceRequestStatus next,
        bool expectedSuccess)
    {
        var result = AssistanceRequestStateMachine.ValidateTransition(current, next);
        Assert.Equal(expectedSuccess, result.IsSuccess);
    }

    [Theory]
    [InlineData(BookingStatus.Pending, BookingStatus.Confirmed, true)]
    [InlineData(BookingStatus.Pending, BookingStatus.Rejected, true)]
    [InlineData(BookingStatus.Pending, BookingStatus.Cancelled, true)]
    [InlineData(BookingStatus.Confirmed, BookingStatus.Completed, true)]
    [InlineData(BookingStatus.Confirmed, BookingStatus.Cancelled, true)]
    [InlineData(BookingStatus.Completed, BookingStatus.Pending, false)]
    [InlineData(BookingStatus.Rejected, BookingStatus.Confirmed, false)]
    public void BookingStateMachine_ValidatesTransitionsCorrectly(
        BookingStatus current,
        BookingStatus next,
        bool expectedSuccess)
    {
        var result = BookingStateMachine.ValidateTransition(current, next);
        Assert.Equal(expectedSuccess, result.IsSuccess);
    }
}
