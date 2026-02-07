using MediatR;

namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record GetByIdQuery : IRequest<GetResponse>
{
    public Guid Id { get; set; }
}