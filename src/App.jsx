import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const addTask = () => {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      const newTask = {
        name: taskName,
        date: currentDate.toLocaleDateString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => task.date === currentDate.toLocaleDateString());

  return (
    <div className="App">
      <header className="App-header">
        <h1>Seder Hayom</h1>
        <div>
          <button onClick={() => changeDate('prev')}>&lt;</button>
          <span>{currentDate.toLocaleDateString()}</span>
          <button onClick={() => changeDate('next')}>&gt;</button>
          <button onClick={handleToday}>Today</button>
        </div>
      </header>
      <main>
        <h2>Tasks for {currentDate.toLocaleDateString()}:</h2>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              {task.name}
              <button onClick={() => removeTask(task.id)}>Remove Task</button>
            </li>
          ))}
        </ul>
        <button onClick={addTask}>Add Task</button>
      </main>
    </div>
  );
}

export default App;
