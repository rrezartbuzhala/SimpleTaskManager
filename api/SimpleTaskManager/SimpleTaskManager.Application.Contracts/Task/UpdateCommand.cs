using SimpleTaskManager.Application.Contracts.Common.Enums;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record UpdateCommand
{
    public string Title { get; set; }
    public string Description { get; set; }
    public Priority Priority { get; set; }
    public ApplicationTaskStatus Status { get; set; }
}