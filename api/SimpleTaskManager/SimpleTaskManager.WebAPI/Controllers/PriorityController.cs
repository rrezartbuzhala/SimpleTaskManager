using Microsoft.AspNetCore.Mvc;
using SimpleTaskManager.Application.Contracts.Common.Enums;
using SimpleTaskManager.WebAPI.Common;

namespace SimpleTaskManager.WebAPI.Controllers;

[BasicAuthorization]
[ApiController]
[Route("priority")]
public class PriorityController : ControllerBase
{
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Enum.GetNames(typeof(Priority)));
    }
}