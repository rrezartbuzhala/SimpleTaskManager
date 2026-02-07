using SimpleTaskManager.Application.Contracts.Common.Enums;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record GetResponse
{
    public Guid Id { get; init; }
    public string? Title { get; init; }
    public string? Description { get; init; }
    public Priority Priority { get; init; }
    public ApplicationTaskStatus Status { get; init; }
}