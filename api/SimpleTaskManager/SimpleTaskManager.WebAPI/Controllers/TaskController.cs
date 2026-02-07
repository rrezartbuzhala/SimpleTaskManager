using MediatR;
using Microsoft.AspNetCore.Mvc;
using SimpleTaskManager.Application.Contracts.Common.Enums;
using SimpleTaskManager.Application.Contracts.Task;
using SimpleTaskManager.Application.Features.Task;
using SimpleTaskManager.WebAPI.Common;
using SimpleTaskManager.WebAPI.Contracts.Task;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.WebAPI.Controllers;

[BasicAuthorization]
[ApiController]
[Route("task")]
public class TaskController() : ControllerBase
{
    private static List<GetTaskResponse> tasks =  new();
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TaskRequest request)
    {
        var appResponse = new GetTaskResponse()
        {
            Id = Guid.CreateVersion7(),
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            Status = request.Status
        };
        
        tasks.Add(appResponse);
        return Ok(appResponse);
    }
    
    [HttpGet]
    public async Task<IEnumerable<TaskResponse>> Get(int? pageNumber, int? pageSize)
    {
        var response = tasks.Select(task => new TaskResponse()
        {
            Id = task.Id.ToString(),
            Title = task.Title,
            Description = task.Description,
            Priority = task.Priority,
            Status = task.Status 
        }).ToList();
        
        return response;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<TaskResponse> GetById(string id)
    {
        var task = tasks.FirstOrDefault(t => t.Id.ToString() == id);
        return new TaskResponse()
        {
            Id = task.Id.ToString(),
            Title = task.Title,
            Description = task.Description,
            Priority = task.Priority,
            Status = task.Status
        };
    }
    
}