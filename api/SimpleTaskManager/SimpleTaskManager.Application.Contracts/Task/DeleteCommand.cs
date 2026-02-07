namespace SimpleTaskManager.Application.Contracts.Task;

public sealed record DeleteCommand
{
    public Guid Id { get; set; }
}