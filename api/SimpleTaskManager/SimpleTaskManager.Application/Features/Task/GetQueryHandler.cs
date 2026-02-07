using MediatR;
using Microsoft.EntityFrameworkCore;
using SimpleTaskManager.Application.Contracts.Common.Enums;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.Persistence.Contracts;
using TaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.Application.Features.Task;

public class GetQueryHandler(IApplicationDbContext context) : IRequestHandler<GetQuery, IEnumerable<GetResponse>>
{
    public async Task<IEnumerable<GetResponse>> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var query = context.Tasks.AsQueryable();
        if (request.Status is not null)
        {
            query = query.Where(task => task.Status == request.Status.ToString());
        }
        
        var response = await query.Select(task => new GetResponse()
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Priority = Enum.Parse<Priority>(task.Priority),
            Status = Enum.Parse<TaskStatus>(task.Status)
        }).ToListAsync(cancellationToken: cancellationToken);

        return response;

    }
    
}
        