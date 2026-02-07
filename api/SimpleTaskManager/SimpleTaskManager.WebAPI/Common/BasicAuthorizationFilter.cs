using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SimpleTaskManager.WebAPI.Common;

public class BasicAuthorizationFilter : IAuthorizationFilter
{
    private const string AuthorizationHeader = "Authorization";
    
    //TODO: Move to appsettings.json
    private const string ValidUsername = "admin";
    private const string ValidPassword = "password";

    public void OnAuthorization(AuthorizationFilterContext context)
    { if (!context.HttpContext.Request.Headers.TryGetValue(AuthorizationHeader, out var authHeader))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var header = authHeader.ToString();

        if (!header.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var encodedCredentials = header[("Basic ".Length)..].Trim();
        string decoded;
        try
        {
            decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCredentials));
        }
        catch
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var parts = decoded.Split(':', 2);
        if (parts.Length != 2)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var username = parts[0];
        var password = parts[1];

        if (username != ValidUsername || password != ValidPassword)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}