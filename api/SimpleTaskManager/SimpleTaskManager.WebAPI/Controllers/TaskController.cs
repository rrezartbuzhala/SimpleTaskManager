using MediatR;
using Microsoft.AspNetCore.Mvc;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.WebAPI.Common;
using SimpleTaskManager.WebAPI.Contracts.Task;
using TaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.WebAPI.Controllers;

[BasicAuthorization]
[ApiController]
[Route("tasks")]
public class TasksController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskRequest request)
    {
        var command = new CreateCommand()
        {
            Description = request.Description,
            Title = request.Title,
            Priority = request.Priority,
            Status = request.Status
        };
        
        var response = await mediator.Send(command);
        
        return Ok(response);
    }
    
    [HttpGet]
    public async Task<IActionResult> Get(TaskStatus? status)
    {
        var query = new GetQuery()
        {
            Status = status
        };
        
        var appResponse = await mediator.Send(query);

        var response = appResponse.Select(task => new TaskResponse()
        {
            Id = task.Id.ToString(),
            Title = task.Title,
            Description = task.Description,
            Priority = task.Priority,
            Status = task.Status
        });
        
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var query = new GetByIdQuery
        {
            Id = id
        };

        var appResponse = await mediator.Send(query);
        
        if (appResponse.Title == null) return NotFound();

        var response = new TaskResponse()
        {
            Id = appResponse.Id.ToString(),
            Title = appResponse.Title,
            Description = appResponse.Description,
            Priority = appResponse.Priority,
            Status = appResponse.Status
        };
        
        return Ok(response);
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var command = new DeleteCommand()
        {
            Id = id
        };
        
        var isDeleted = await mediator.Send(command);
        
        if (!isDeleted) return NotFound();
        
        return Ok(isDeleted);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> Patch(Guid id, [FromBody] UpdateTaskRequest updateTaskRequest)
    {
        var command = new UpdateCommand()
        {
            Id = id,
            Title = updateTaskRequest.Title,
            Description = updateTaskRequest.Description,
            Priority = updateTaskRequest.Priority,
            Status = updateTaskRequest.Status
        };
        
        var response = await mediator.Send(command);
        
        if (response == Guid.Empty) return NotFound();
        
        return Ok(response);
    }
}