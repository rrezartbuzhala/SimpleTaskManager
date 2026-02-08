import { useState } from 'react';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import './Page.css';

function Dashboard() {
  const [ , setStatusFilterState ] = useState('All');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const statusFilter = searchParams.get('status') || 'All';
  
  
  const statuses = ['All', 'Todo', 'InProgress', 'Done', 'Blocked'];

  return (
    <div>
      <div className="task-filter">
        {statuses.map(s => (
          <button
            key={s}
            className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
            onClick={() => {
              setStatusFilterState(s);
              if (s === 'All') {
                navigate('/');
              } else {
                navigate(`/?status=${s}`);
              }
            }}
          >
            {s}
          </button>
        ))}
        <button className="add-task-btn" onClick={() => navigate('/tasks/new')}>
          + New Task
        </button>
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard;