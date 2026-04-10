import React, { useState } from 'react';
import Calendar from './Calendar';
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
      <div class="flex flex-row justify-between">
        <div class="bg-[#0B3560] h-screen w-48 rounded-br-3xl">
          <Sedarim d = {{currentDate, setCurrentDate}}
                  t = {{tasks, setTasks}}/>
        </div>
        <div class="">
          <main>
            <Tasks d = {{currentDate, setCurrentDate}}
                  t = {{tasks, setTasks}}/>
          </main>   
        </div>
          <Calendar state = {{currentDate, setCurrentDate}}/>
      </div>
      <div class="flex flex-row justify-center">
        <Footer/>
      </div>  
    </div>

    
  );
}

export default App;
