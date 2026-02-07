using MediatR;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.Persistence.Contracts;

namespace SimpleTaskManager.Application.Features.Task;

public class CreateCommandHandler(IApplicationDbContext context) : IRequestHandler<CreateCommand, Guid>
{
    public async Task<Guid> Handle(CreateCommand request, CancellationToken cancellationToken)
    {
        var taskEntity = new Persistence.Contracts.Task.Task()
        {
            Id = request.Id,
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority.ToString(),
            Status = request.Status.ToString()
        };
        context.Tasks.Add(taskEntity);
        await context.SaveChangesAsync(cancellationToken);

        return taskEntity.Id;
    }
}