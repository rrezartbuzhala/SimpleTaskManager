namespace SimpleTaskManager.Domain.Entities.Task;

public sealed record Task
{
    public Guid Id { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string Priority { get; set; } 
    
    public string Status { get; set; }
}