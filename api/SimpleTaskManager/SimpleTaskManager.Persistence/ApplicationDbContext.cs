using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SimpleTaskManager.Persistence.Contracts;
using DomainTask = SimpleTaskManager.Persistence.Contracts.Task.Task;

namespace SimpleTaskManager.Persistence;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
    : DbContext(options), IApplicationDbContext
{
    public DbSet<DomainTask> Tasks { get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ApplicationDbContext).Assembly
        );
    }
}