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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const task = { id, title, description, priority, status };

    dispatch(addTask(task));
    await dispatch(createTaskRemote(task));

    if (onCreate) {
      onCreate(task);
    } else {
      navigate('/');
    }
  };

  const cancel = () => {
    if (onCancel) onCancel();
    else navigate('/');
  };

  return (
    <div className="create-task dark-task-card">
      <form onSubmit={submit} className="dark-task-form">
        
        <div className="dark-form-group">
          <label className="dark-form-label" htmlFor="task-title">Title</label>
          <input id="task-title" className="dark-form-input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="dark-form-group">
          <label className="dark-form-label" htmlFor="task-desc">Description</label>
          <textarea id="task-desc" className="dark-form-input" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="dark-form-group">
          <label className="dark-form-label" htmlFor="task-priority">Priority</label>
          <select id="task-priority" className="dark-form-input" value={priority} onChange={e => setPriority(e.target.value)}>
            {Array.isArray(priorities) && priorities.length > 0 ? (
              priorities.map(p => <option key={p} value={p}>{p}</option>)
            ) : (
              <option>N/A</option>
            )}
          </select>
        </div>
        <div className="dark-form-group">
          <label className="dark-form-label" htmlFor="task-status">Status</label>
          <select id="task-status" className="dark-form-input" value={status} onChange={e => setStatus(e.target.value)}>
            {Array.isArray(statuses) && statuses.length > 0 ? (
              statuses.map(s => <option key={s} value={s}>{s}</option>)
            ) : (
              <option>N/A</option>
            )}
          </select>
        </div>
        <div className="dark-actions">
          <button type="button" className="dark-btn dark-btn-cancel" onClick={cancel}>Cancel</button>
          <button type="submit" className="dark-btn dark-btn-create">Create</button>
        </div>
      </form>
    </div>
  );
}
