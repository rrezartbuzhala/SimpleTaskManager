import './App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import Dashboard from './features/Dashboard/Page';
import AuthDialog from './components/AuthDialog/AuthDialog';
import Tasks from './components/Tasks/Tasks';
import TaskDetail from './components/TaskDetail/TaskDetail';
import CreateTask from './components/CreateTask/CreateTask';
import { store } from './store/store';
import { Provider } from 'react-redux';

function TasksRouteWrapper() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'All';
  const navigate = useNavigate();
  return <Tasks statusFilter={status} onSelect={(id) => navigate(`/tasks/${id}`)} />;
}

function TaskDetailWrapper() {
  const { id } = useParams();
  if (!id) return null;
  return <TaskDetail id={id} />;
}

function CreateTaskWrapper() {
  const navigate = useNavigate();
  return <CreateTask onCreate={() => navigate('/')} onCancel={() => navigate(-1)} />;
}

function AppInner() {
  const [authorized, setAuthorized] = useState(false);
  const [, setAuthHeader] = useState<string | null>(null);

  useEffect(() => {
    const creds = localStorage.getItem('authCreds');
    if (creds) {
      setAuthHeader(`Basic ${creds}`);
      setAuthorized(true);
    }
  }, []);

  if (!authorized) {
    return <AuthDialog onSuccess={(header) => { setAuthHeader(header); setAuthorized(true); }} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<TasksRouteWrapper />} />
          <Route path="tasks/new" element={<CreateTaskWrapper />} />
          <Route path="tasks/:id" element={<TaskDetailWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
