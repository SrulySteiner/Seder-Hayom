import React, {useRef, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import './index.css';
import Check from './assets/green-checkmark-icon.svg';

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
                               <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:bg-white text-white" onClick={() => toggleChecked(task.id)}>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#6BBE66" d="M48,0c26.51,0,48,21.49,48,48S74.51,96,48,96S0,74.51,0,48 S21.49,0,48,0L48,0z M26.764,49.277c0.644-3.734,4.906-5.813,8.269-3.79c0.305,0.182,0.596,0.398,0.867,0.646l0.026,0.025 c1.509,1.446,3.2,2.951,4.876,4.443l1.438,1.291l17.063-17.898c1.019-1.067,1.764-1.757,3.293-2.101 c5.235-1.155,8.916,5.244,5.206,9.155L46.536,63.366c-2.003,2.137-5.583,2.332-7.736,0.291c-1.234-1.146-2.576-2.312-3.933-3.489 c-2.35-2.042-4.747-4.125-6.701-6.187C26.993,52.809,26.487,50.89,26.764,49.277L26.764,49.277z"/></g></svg>
                               </button>
                              {(!task.isSeder) ? 
                                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" aria-label="Close alert" type="button" data-close onClick={() => removeTask(task.id)}>
                                  <svg class="h-6 w-6 text-black hover:text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </button>
                              : <></>
                              } 
                              </>
                             :
                             <>
                             <p class="w-full line-through text-green">{task.name}</p>
                             <button class="flex-no-shrink text-xs p-2 ml-4 mr-2 border-2 rounded hover:text-white border-grey" onClick={() => toggleChecked(task.id)}>
                              <svg version="1.1" id="Layer_1" class="hover:fill-white"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 122.879 122.879" enable-background="new 0 0 122.879 122.879" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"/></g></svg>
                             </button>
                            {(!task.isSeder) ? 
                              <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" aria-label="Close alert" type="button" data-close onClick={() => removeTask(task.id)}>
                                <svg class="h-6 w-6 text-black hover:text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                              </button>
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

