using MediatR;
using Microsoft.EntityFrameworkCore;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.Persistence.Contracts;

namespace SimpleTaskManager.Application.Features.Task;

public class DeleteCommandHandler(IApplicationDbContext context) : IRequestHandler<DeleteCommand, bool>
{
    public async Task<bool> Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var taskEntity = await context.Tasks.SingleOrDefaultAsync(task => task.Id == request.Id, cancellationToken: cancellationToken);
        
        if (taskEntity == null) return false;

        context.Tasks.Remove(taskEntity);

        await context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
}