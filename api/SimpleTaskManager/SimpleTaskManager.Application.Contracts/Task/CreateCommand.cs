using MediatR;
using SimpleTaskManager.Application.Contracts.Common.Enums;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record CreateCommand : IRequest<Guid>
{
    public Guid Id { get; } = Guid.CreateVersion7();
    public string Title { get; init; }
    public string Description { get; init; }
    public Priority Priority { get; init; }
    public ApplicationTaskStatus Status { get; init; }
}