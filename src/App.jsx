import React, { useState, useEffect } from 'react';
import Header from './Header';
import Seder from './Seder';
import Tasks from './Tasks'
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="App">
      <Header state = {{currentDate, setCurrentDate}}/>
      <main>
        <Tasks d = {{currentDate, setCurrentDate}}
              t = {{tasks, setTasks}}/>
        <Seder/>
      </main>
    </div>
  );
}

export default App;
