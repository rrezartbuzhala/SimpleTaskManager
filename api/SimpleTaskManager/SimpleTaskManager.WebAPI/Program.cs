using System.Text.Json.Serialization;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using SimpleTaskManager.Application.Features.Task;
using SimpleTaskManager.Persistence;
using SimpleTaskManager.Persistence.Contracts;
using SimpleTaskManager.WebAPI.Common;

namespace SimpleTaskManager.WebAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddControllers()
            .AddJsonOptions(o =>
                o.JsonSerializerOptions.Converters.Add(
                    new JsonStringEnumConverter()));
        
        // Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("BasicAuth", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "basic",
                In = ParameterLocation.Header,
                Description = "Basic Authentication header"
            });

            options.AddSecurityRequirement(document => new OpenApiSecurityRequirement()
            {
                [new OpenApiSecuritySchemeReference("BasicAuth", document)] = []
            });
        });
        
        builder.Services.AddOpenApi();
        
        // Auth filter
        builder.Services.AddScoped<BasicAuthorizationFilter>();
        
        // Database
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString)
        );
        
        builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        
        // MediatR and FluentValidation
        builder.Services.AddMediatR(cfg 
            => cfg.RegisterServicesFromAssembly(typeof(CreateCommandHandler).Assembly));
        
        builder.Services.AddValidatorsFromAssembly(typeof(CreateCommandValidator).Assembly);
        
        builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        
        //CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
        
        var app = builder.Build();
        
        //Migration
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            db.Database.Migrate();
        }
        
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();
        
        app.MapControllers();
        
        app.UseCors("AllowAll");

        app.Run();
    }
}