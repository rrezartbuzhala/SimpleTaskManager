import './Tasks.css';
import TaskCard from '../TaskCard/TaskCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasks } from '../../store/slices/tasksSlice';
import type { RootState } from '../../store/store';

interface TasksProps {
  statusFilter: string;
  onSelect?: (id: string) => void;
}

export default function Tasks({ statusFilter, onSelect }: TasksProps) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const validTasks = tasks.filter(t => t && t.id);
  const filteredTasks = (statusFilter === 'All' ? validTasks : validTasks.filter(t => t.status === statusFilter))
    .slice()
    .sort((a, b) => b.id.localeCompare(a.id));

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
