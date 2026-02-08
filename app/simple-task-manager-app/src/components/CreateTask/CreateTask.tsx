import './CreateTask.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPriorities } from '../../store/slices/prioritiesSlice';
import { getStatuses } from '../../store/slices/statusesSlice';
import { addTask, createTaskRemote } from '../../store/slices/tasksSlice';
import type { RootState, AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface CreateTaskProps {
  onCreate?: (task: { id: string; title: string; description: string; priority: string; status: string }) => void;
  onCancel?: () => void;
}

export default function CreateTask({ onCreate, onCancel }: CreateTaskProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const priorities = useSelector((state: RootState) => state.priorities?.items || []);
  const statuses = useSelector((state: RootState) => state.statuses?.items || []);

  useEffect(() => {
    dispatch(getPriorities());
    dispatch(getStatuses());
  }, [dispatch]);

  useEffect(() => {
    if (priority === '' && Array.isArray(priorities) && priorities.length > 0) {
      setPriority(priorities[0]);
    }
  }, [priorities, priority]);

  useEffect(() => {
    if (status === '' && Array.isArray(statuses) && statuses.length > 0) {
      setStatus(statuses[0]);
    }
  }, [statuses, status]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const task = { id, title, description, priority, status };

    dispatch(addTask(task));
    dispatch(createTaskRemote(task));

    if (onCreate) onCreate(task);
    if (onCancel) onCancel();
    else navigate('/');
  };

  const cancel = () => {
    if (onCancel) onCancel();
    else navigate('/');
  };

  return (
    <div className="create-task" style={{ marginTop: 60 }}>
      <form onSubmit={submit} className="create-form">
        <h2>Create Task</h2>
        <label>Title<input value={title} onChange={e => setTitle(e.target.value)} required /></label>
        <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} /></label>
        <label>Priority
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            {Array.isArray(priorities) && priorities.length > 0 ? (
              priorities.map(p => <option key={p} value={p}>{p}</option>)
            ) : (
              <>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </>
            )}
          </select>
        </label>
        <label>Status
          <select value={status} onChange={e => setStatus(e.target.value)}>
            {Array.isArray(statuses) && statuses.length > 0 ? (
              statuses.map(s => <option key={s} value={s}>{s}</option>)
            ) : (
              <>
                <option>Todo</option>
                <option>InProgress</option>
                <option>Done</option>
                <option>Blocked</option>
              </>
            )}
          </select>
        </label>
        <div className="actions">
          <button type="button" onClick={cancel}>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
