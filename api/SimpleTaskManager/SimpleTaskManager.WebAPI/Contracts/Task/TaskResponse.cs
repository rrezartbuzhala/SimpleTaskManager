using System.Text.Json.Serialization;
using SimpleTaskManager.Application.Contracts.Common.Enums;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.WebAPI.Contracts.Task;

public sealed record TaskResponse()
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }
    
    [JsonPropertyName("title")]
    public string? Title { get; set; }
    
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonPropertyName("priority")]
    public Priority Priority { get; set; }
    
    [JsonPropertyName("status")]
    public ApplicationTaskStatus Status { get; set; }
}