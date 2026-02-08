import './TaskDetail.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface TaskDetailProps {
  id: string;
}

export default function TaskDetail({ id }: TaskDetailProps) {
  const task = useSelector((state: RootState) => state.tasks.items.find(t => t.id === id));
  if (!task) return (
    <div className="task-detail">
      <div>Task not found</div>
    </div>
  );

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <div className="meta">
        <span className="task-badge">{task.priority}</span>
        <span className="task-status-badge">{task.status}</span>
      </div>
      <p>{task.description}</p>
    </div>
  );
}
