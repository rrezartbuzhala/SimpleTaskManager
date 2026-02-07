using Microsoft.AspNetCore.Mvc;
using SimpleTaskManager.WebAPI.Common;

namespace SimpleTaskManager.WebAPI.Controllers;

[BasicAuthorization]
[ApiController]
[Route("authorization")]
public class AuthorizationController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Authorized");
    }
}