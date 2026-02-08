import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getStatuses } from '../../store/slices/statusesSlice';
import './Page.css';

function Dashboard() {
  const [ , setStatusFilterState ] = useState('All');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusFilter = searchParams.get('status') || 'All';

  useEffect(() => {
    dispatch(getStatuses());
  }, [dispatch]);

  const statusList = useSelector((state: RootState) => state.statuses?.items || []);
  const statuses = ['All', ...statusList];

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