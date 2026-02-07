using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DomainTask = SimpleTaskManager.Persistence.Contracts.Task.Task;

namespace SimpleTaskManager.Persistence.Configurations;

public class TaskConfiguration : IEntityTypeConfiguration<DomainTask>
{
    public void Configure(EntityTypeBuilder<DomainTask> builder)
    {
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Id)
            .IsRequired();
        
        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .IsRequired();
        
        builder.Property(x => x.Priority)
            .IsRequired()
            .HasMaxLength(10);
        
        builder.Property(x => x.Status)
            .IsRequired()
            .HasMaxLength(10);
        
        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_Tasks_Status");
        
        builder.ToTable("Tasks");

    }
}