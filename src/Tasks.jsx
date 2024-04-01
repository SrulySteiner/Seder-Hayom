import React, {useRef, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import './index.css';

const Container  = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  opacity: 1;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

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
          isSeder: false
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
  
    const filteredTasks = t.tasks.filter(task => task.date === d.currentDate.toLocaleDateString());
    
    const onDragEnd = (result) =>{
      const {destination, source, draggableId} = result;
      if(!destination){
        return;
      }

      if(destination.droppableId === source.droppableId &&
        destination.index === source.index){
          return;
        }
      const nextTaskList = [...t.tasks];
      nextTaskList.splice(source.index, 1);
      nextTaskList.splice(destination.index, 0,t.tasks.find(task => task.id === draggableId));
      t.setTasks(nextTaskList);
    }   

  return (
      <Container>
          <Title>Tasks for {d.currentDate.toLocaleDateString()}:</Title>
          <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId = {crypto.randomUUID()}>
                {(provided) =>(
                  <TaskList 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    key = {1}
                  >
                    {filteredTasks.map((task, index) => {
                      return (
                        <Draggable draggableId={task.id} index={index}>
                          {(provided) => (
                            <Container key={task.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <label>
                                <input type="checkbox" />
                                <span>{task.name}</span>
                                <button className="close-button" aria-label="Close alert" type="button" data-close onClick={() => removeTask(task.id)}>&times;</button>
                              </label>
                            </Container>
                          )}

                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </TaskList>
                )}
                
              </Droppable>
              
          </DragDropContext>
            <form onSubmit={addTask}>
              <input ref={taskRef} type="text" autoComplete="off" id="addtask" name="addtask" maxLength="50"></input>
              <button type="submit">Add Task</button>
            </form>
      </Container>
  );
}

export default Tasks;