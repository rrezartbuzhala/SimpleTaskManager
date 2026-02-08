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
  return (
    <div
      className={`task-card priority-${priority.toLowerCase()} status-${status.toLowerCase()}`}
      onClick={() => onClick ? onClick(id) : console.log(`Task ${id} clicked`)}
    >
      <div className="task-card-header">
        <h3 className="task-card-title" title={title}>{title}</h3>
        <div className="task-badges">          
          <span className="task-badge">{priority}</span>
          <span className="task-status-badge">{status}</span>
        </div>
      </div>

      <p className="task-description">{description}</p>
    </div>
  );
}

export default TaskCard;