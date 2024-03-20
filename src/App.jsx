import React, { useState } from 'react';
import Header from './Header';
import Sedarim from './Seder';
import Tasks from './Tasks'
import './index.css';

const getIntitalState = () =>{
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}
function App() {
  const [tasks, setTasks] = useState(getIntitalState);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <div>
        <Sedarim d = {{currentDate, setCurrentDate}}
                 t = {{tasks, setTasks}}/>
      </div>
      <div className="App">
        <Header state = {{currentDate, setCurrentDate}}/>
        <main>
          <Tasks d = {{currentDate, setCurrentDate}}
                 t = {{tasks, setTasks}}/>
        </main>
      </div>
    </div>
    
  );
}

export default App;
