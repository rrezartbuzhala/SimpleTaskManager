import './TaskCard.css';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  onClick?: (id: string) => void;
}

function TaskCard({ id, title, description, priority, status, onClick }: TaskCardProps) {
  const priorityClass = priority ? priority.toLowerCase() : 'medium';
  const statusClass = status ? status.toLowerCase() : 'todo';
  
  return (
    <div
      className="task-card"
      onClick={() => onClick ? onClick(id) : console.log(`Task ${id} clicked`)}
    >
      <div className="task-card-header">
        <h3 className="task-card-title" title={title}>{title}</h3>
        <div className={`task-badges priority-${priorityClass} status-${statusClass}`}>          
          <span className="task-badge">{priority || 'Medium'}</span>
          <span className="task-status-badge">{status || 'Todo'}</span>
        </div>
      </div>

      <p className="task-description">{description}</p>
    </div>
  );
}

export default TaskCard;