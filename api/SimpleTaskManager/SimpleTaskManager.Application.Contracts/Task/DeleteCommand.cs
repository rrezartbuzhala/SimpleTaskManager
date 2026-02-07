using MediatR;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record DeleteCommand : IRequest<bool>
{
    public Guid Id { get; set; }
}