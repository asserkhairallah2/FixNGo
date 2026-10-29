using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace FixNGo.Web.Hubs;

/// <summary>
/// Real-time SignalR hub for in-app chat between customer and provider (SAD UC-13, SRS FR-28).
/// </summary>
public class ChatHub : Hub
{
    public async Task SendMessage(string requestId, string sender, string message)
    {
        await Clients.Group(requestId).SendAsync("ReceiveMessage", sender, message);
    }

    public async Task JoinChatGroup(string requestId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, requestId);
    }

    public async Task LeaveChatGroup(string requestId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, requestId);
    }
}

