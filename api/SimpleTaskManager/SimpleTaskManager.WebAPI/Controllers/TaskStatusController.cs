using Microsoft.AspNetCore.Mvc;
using SimpleTaskManager.WebAPI.Common;
using ApplicationTaskStatus = SimpleTaskManager.Application.Contracts.Common.Enums.TaskStatus;

namespace SimpleTaskManager.WebAPI.Controllers;

[BasicAuthorization]
[ApiController]
[Route("task-status")]
public class TaskStatusController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Enum.GetNames(typeof(ApplicationTaskStatus)));
    }
}