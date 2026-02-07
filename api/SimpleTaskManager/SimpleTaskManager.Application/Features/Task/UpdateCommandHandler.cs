using MediatR;
using Microsoft.EntityFrameworkCore;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.Persistence.Contracts;

namespace SimpleTaskManager.Application.Features.Task;

public class UpdateCommandHandler(IApplicationDbContext context) : IRequestHandler<UpdateCommand, Guid>
{
    public async Task<Guid> Handle(UpdateCommand request, CancellationToken cancellationToken)
    {
        var taskEntity = await context.Tasks.SingleOrDefaultAsync(task => task.Id == request.Id, cancellationToken: cancellationToken);
        
        if (taskEntity == null) return Guid.Empty;
        
        taskEntity.Title = request.Title ?? taskEntity.Title;
        taskEntity.Description = request.Description ?? taskEntity.Description;
        taskEntity.Priority = request.Priority?.ToString() ?? taskEntity.Priority;
        taskEntity.Status = request.Status?.ToString() ?? taskEntity.Status;
        
        await context.SaveChangesAsync(cancellationToken);
        
        return taskEntity.Id;
        
    }
}