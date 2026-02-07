import { useState } from 'react';
import './Page.css';

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <div>
        <h1>Task Manager Board</h1>
        <p>Welcome to the dashboard! This is where you can manage your tasks.</p>
        <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
        </button>
        <p>Here we render the app content</p>
    </div>
  )
}

export default Dashboard;