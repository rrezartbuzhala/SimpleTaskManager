using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

namespace SimpleTaskManager.WebAPI.Common;

public class BasicAuthorizationFilter : IAuthorizationFilter
{
    private const string AuthorizationHeader = "Authorization";

    private readonly IConfiguration _configuration;

    public BasicAuthorizationFilter(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue(AuthorizationHeader, out var authHeader))
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

        var configuredUsername = _configuration["BasicAuth:Username"];
        var configuredPassword = _configuration["BasicAuth:Password"];

        if (string.IsNullOrWhiteSpace(configuredUsername) || string.IsNullOrWhiteSpace(configuredPassword))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var username = parts[0];
        var password = parts[1];

        if (!string.Equals(username, configuredUsername, StringComparison.Ordinal) ||
            !string.Equals(password, configuredPassword, StringComparison.Ordinal))
        {
            context.Result = new UnauthorizedResult();
        }
    }
}