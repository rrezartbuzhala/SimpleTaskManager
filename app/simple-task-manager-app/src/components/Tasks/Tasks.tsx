import './Tasks.css';
import TaskCard from '../TaskCard/TaskCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface TasksProps {
  statusFilter: string;
  onSelect?: (id: string) => void;
}

export default function Tasks({ statusFilter, onSelect }: TasksProps) {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const filteredTasks = statusFilter === 'All' ? tasks : tasks.filter(t => t.status === statusFilter);

  return (
    <div className="task-grid">
      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          status={task.status}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
