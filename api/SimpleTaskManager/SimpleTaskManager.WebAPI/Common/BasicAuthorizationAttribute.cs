using Microsoft.AspNetCore.Mvc;

namespace SimpleTaskManager.WebAPI.Common;

public class BasicAuthorizationAttribute() : TypeFilterAttribute(typeof(BasicAuthorizationFilter));