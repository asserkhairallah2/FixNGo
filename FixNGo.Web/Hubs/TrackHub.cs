using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace FixNGo.Web.Hubs;

/// <summary>
/// Real-time SignalR hub for live driver and provider GPS tracking (SAD UC-11, SRS FR-21).
/// </summary>
public class TrackHub : Hub
{
    public async Task SendLocationUpdate(string requestId, double latitude, double longitude)
    {
        await Clients.Group(requestId).SendAsync("ReceiveLocationUpdate", latitude, longitude);
    }

    public async Task JoinTrackingGroup(string requestId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, requestId);
    }

    public async Task LeaveTrackingGroup(string requestId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, requestId);
    }
}

