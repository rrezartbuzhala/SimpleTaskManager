using MediatR;
using Microsoft.EntityFrameworkCore;
using SimpleTaskManager.Application.Contracts.Common.Enums;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.Persistence.Contracts;
using TaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Features.Task;

public class GetByIdQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetByIdQuery, GetResponse>
{
    public async Task<GetResponse> Handle(GetByIdQuery request, CancellationToken cancellationToken)
    {
        var taskEntity = await context.Tasks.AsNoTracking()
            .SingleOrDefaultAsync(task => task.Id == request.Id, cancellationToken: cancellationToken);

        if (taskEntity == null) return new GetResponse();
        
        var response = new GetResponse()
        {
            Id = taskEntity.Id,
            Title = taskEntity.Title,
            Description = taskEntity.Description,
            Priority = Enum.Parse<Priority>(taskEntity.Priority),
            Status = Enum.Parse<TaskStatus>(taskEntity.Status)
        };

        return response;

    }
}