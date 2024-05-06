import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
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
    <div class="flex flex-col h-screen justify-between">
      <div class='container'>
        <div class='sidebar'>
          <Sedarim d = {{currentDate, setCurrentDate}}
                  t = {{tasks, setTasks}}/>
        </div>
        <div class='main'>
          <Header state = {{currentDate, setCurrentDate}}/>
          <main>
            <Tasks d = {{currentDate, setCurrentDate}}
                  t = {{tasks, setTasks}}/>
          </main>
            
        </div>
            
      </div>
      <div class="h-10">
        <Footer/>
      </div>  
    </div>

    
  );
}

export default App;
