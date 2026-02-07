using Microsoft.EntityFrameworkCore;

namespace SimpleTaskManager.Persistence.Contracts;
using DomainTask = SimpleTaskManager.Persistence.Contracts.Task.Task;

public interface IApplicationDbContext
{
    public DbSet<DomainTask> Tasks { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}