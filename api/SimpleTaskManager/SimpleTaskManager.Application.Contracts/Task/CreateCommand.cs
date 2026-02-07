using SimpleTaskManager.Application.Contracts.Common.Enums;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record CreateCommand
{
    public Guid Id { get; set; } = Guid.CreateVersion7();
    public string Title { get; set; }
    public string Description { get; set; }
    public Priority Priority { get; set; }
    public ApplicationTaskStatus Status { get; set; }
}