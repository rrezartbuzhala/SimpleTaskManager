import './TaskDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState, AppDispatch } from '../../store/store';
import apiClient from '../../services/apiClient';
import { addTask } from '../../store/slices/tasksSlice';
import { getPriorities } from '../../store/slices/prioritiesSlice';
import { getStatuses } from '../../store/slices/statusesSlice';

interface TaskDetailProps {
  id: string;
}


export default function TaskDetail({ id }: TaskDetailProps) {
  const dispatch = useDispatch<AppDispatch>();
  const reduxTask = useSelector((state: RootState) => state.tasks.items.find(t => t.id === id));
  const priorities = useSelector((state: RootState) => state.priorities.items);
  const statuses = useSelector((state: RootState) => state.statuses.items);
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [task, setTask] = useState(reduxTask);
  const [titleValue, setTitleValue] = useState(reduxTask?.title || '');
  const [descValue, setDescValue] = useState(reduxTask?.description || '');
  const [loading, setLoading] = useState(!reduxTask);

  // Fetch priorities and statuses if not loaded
  useEffect(() => {
    if (priorities.length === 0) dispatch(getPriorities());
    if (statuses.length === 0) dispatch(getStatuses());
  }, [dispatch, priorities.length, statuses.length]);

  // Fetch task from API if not in Redux (e.g., on page refresh)
  useEffect(() => {
    if (!reduxTask && id) {
      setLoading(true);
      apiClient.get(`/tasks/${id}`)
        .then(res => {
          const fetchedTask = res.data;
          setTask(fetchedTask);
          setTitleValue(fetchedTask.title);
          setDescValue(fetchedTask.description);
          dispatch(addTask(fetchedTask));
        })
        .catch(() => {
          setTask(undefined);
        })
        .finally(() => setLoading(false));
    }
  }, [id, reduxTask, dispatch]);

  useEffect(() => {
    if (reduxTask && !editTitle && !editDesc && (reduxTask.title !== task?.title || reduxTask.description !== task?.description)) {
      setTask(reduxTask);
      setTitleValue(reduxTask.title);
      setDescValue(reduxTask.description);
    }
  }, [reduxTask, editTitle, editDesc]);

  if (loading) return (
    <div className="task-detail">
      <div>Loading...</div>
    </div>
  );

  if (!task) return (
    <div className="task-detail">
      <div>Task not found</div>
    </div>
  );


  const updateTaskField = async (field: 'title' | 'description' | 'priority' | 'status', value: string) => {
    const patchBody = {
      title: field === 'title' ? value : null,
      description: field === 'description' ? value : null,
      priority: field === 'priority' ? value : null,
      status: field === 'status' ? value : null,
    };
    // Send PATCH to backend, then refresh
    try {
      await apiClient.patch(`/tasks/${task.id}`, patchBody);
      // Refresh task from API
      const res = await apiClient.get(`/tasks/${task.id}`);
      const refreshedTask = res.data;
      setTask(refreshedTask);
      setTitleValue(refreshedTask.title);
      setDescValue(refreshedTask.description);
      dispatch(addTask(refreshedTask));
    } catch (e) {
      console.error('Failed to update task:', e);
    }
  };

  return (
    <div className={`task-detail modern-detail-card priority-${task.priority.toLowerCase()} status-${task.status.toLowerCase()}`}> 
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {editTitle ? (
          <input
            className="detail-title-input"
            value={titleValue}
            autoFocus
            onChange={e => setTitleValue(e.target.value)}
            onBlur={() => {
              setEditTitle(false);
              setTitleValue(task.title);
            }}
            onKeyDown={async e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const newValue = titleValue;
                setEditTitle(false);
                if (newValue !== task.title) {
                  await updateTaskField('title', newValue);
                }
              } else if (e.key === 'Escape') {
                setTitleValue(task.title);
                setEditTitle(false);
              }
            }}
          />
        ) : (
          <>
            <h2 className="detail-title">{task.title}</h2>
            <button className="edit-pen-btn" title="Edit title" onClick={() => setEditTitle(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="detail-badges-left">
        <select
          className={`priority-select priority-${task.priority.toLowerCase()}`}
          value={task.priority}
          onChange={async e => {
            if (e.target.value !== task.priority) {
              await updateTaskField('priority', e.target.value);
            }
          }}
        >
          {priorities.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          className={`status-select status-${task.status.toLowerCase()}`}
          value={task.status}
          onChange={async e => {
            if (e.target.value !== task.status) {
              await updateTaskField('status', e.target.value);
            }
          }}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {editDesc ? (
          <textarea
            className="detail-desc-input"
            value={descValue}
            autoFocus
            onChange={e => setDescValue(e.target.value)}
            onBlur={() => {
              setEditDesc(false);
              setDescValue(task.description);
            }}
            onKeyDown={async e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const newValue = descValue;
                setEditDesc(false);
                if (newValue !== task.description) {
                  await updateTaskField('description', newValue);
                }
              } else if (e.key === 'Escape') {
                setDescValue(task.description);
                setEditDesc(false);
              }
            }}
          />
        ) : (
          <>
            <div className="detail-desc">{task.description}</div>
            <button className="edit-pen-btn" title="Edit description" onClick={() => setEditDesc(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
              </svg>
            </button>
            
          </>
        )}
      </div>
    </div>
  );
}
