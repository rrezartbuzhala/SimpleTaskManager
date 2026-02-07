namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record GetByIdQuery
{
    public Guid Id { get; set; }
}