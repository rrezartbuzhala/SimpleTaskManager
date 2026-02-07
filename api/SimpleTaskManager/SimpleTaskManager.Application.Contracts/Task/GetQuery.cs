using MediatR;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record GetQuery : IRequest<IEnumerable<GetResponse>>
{
    public ApplicationTaskStatus? Status { get; set; }
}