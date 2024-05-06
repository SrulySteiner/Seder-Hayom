import React, {useRef, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import './index.css';
import { Button } from "@material-tailwind/react";

function Tasks({d, t}) {
    const taskRef = useRef(null);
    
    useEffect(() =>{
      localStorage.setItem("tasks", JSON.stringify(t.tasks));
    }, [t.tasks]);
    
    function addTask(event){
      event.preventDefault();
        const newTask = {
            id: crypto.randomUUID(),
          name: taskRef.current.value,
          date: d.currentDate.toLocaleDateString(),
          isSeder: false,
          completed: false,
          sederId: null
        };
        t.setTasks(() => {
          const newTasks = [...t.tasks, newTask];
          localStorage.setItem("tasks", JSON.stringify(newTasks));
          return newTasks;

        });
    };
  
    function removeTask(taskId) {
      const updatedTasks = t.tasks.filter(task => task.id !== taskId);
      t.setTasks(updatedTasks);
    };
  
    let filteredTasks = t.tasks.filter(task => task.date === d.currentDate.toLocaleDateString());
    
    function onDragEnd (result){
      if(!result.destination){
        return;
      }

      if(result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index){
          return;
      }

      let newTasks = [...filteredTasks];
      const [removed] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, removed);
      filteredTasks = [...newTasks];
      newTasks = t.tasks.filter(task => task.date != d.currentDate.toLocaleDateString());
      t.setTasks(newTasks.concat(filteredTasks));
    }
    
    function toggleChecked (taskId) {
      let newTasks = t.tasks.map(task =>{
        if(task.id == taskId){
          return {
            ...task,
          completed: !task.completed
          }
        }else{
          return{
            ...task
          }
        }
      })
      t.setTasks(newTasks);
    }

  return (
    <div  class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
          <h1 class="text-grey-darkest">Todo List</h1>
          <div class="flex mt-4">
            <form class ="flex mt-4"onSubmit={addTask}>
              <input ref={taskRef} type="text" autoComplete="off" id="addtask" name="addtask" maxLength="40"
              class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"/>
              <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </form> 
          </div>
      </div>
      <div class="flex">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={crypto.randomUUID()}>
                {(provided, snapshot) =>(
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    key={crypto.randomUUID()}
                  >
                    {filteredTasks.map((task, index) => (
                        <Draggable draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div class="flex mb-4 items-center" 
                              key={task.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {(!task.completed) ? 
                              <>
                               <p class="w-full text-grey-darkest">{task.name}</p>
                               <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={() => toggleChecked(task.id)}>Done</button>
                              {(!task.isSeder) ? 
                                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" aria-label="Close alert" type="button" data-close onClick={() => removeTask(task.id)}> Remove</button>
                              : <></>
                              } 
                              </>
                             :
                             <>
                             <p class="w-full line-through text-green">{task.name}</p>
                             <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey" onClick={() => toggleChecked(task.id)}>Not Done</button>
                            {(!task.isSeder) ? 
                              <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" aria-label="Close alert" type="button" data-close onClick={() => removeTask(task.id)}> Remove</button>
                            : <></>
                            } 
                            </>}
                              
                              
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
                
              </Droppable>
          </DragDropContext>
        </div>
      </div> 
    </div>                
  );
}

export default Tasks;

