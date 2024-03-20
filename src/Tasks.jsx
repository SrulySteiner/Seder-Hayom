import React from 'react';
import styled from 'styled-components';
import Task from './Task';

function Tasks({d, t}) {

    const Container  = styled.div`
        margin: 8px;
        border: 1px solid lightgrey;
        border-radius: 2px;
    `;
    const Title = styled.h3`
        padding: 8px;
    `;
    const TaskList = styled.div`
        padding: 8px;
    `;
    
    const addTask = (name) => {
      if (name) {
        const newTask = {
            id: name,
          name: name,
          date: d.currentDate.toLocaleDateString(),
          completed: false
        };
        t.setTasks([...t.tasks, newTask]);
      }
    };
  
    const removeTask = (taskId) => {
      const updatedTasks = t.tasks.filter(task => task.name !== taskId);
      t.setTasks(updatedTasks);
    };
  
    const filteredTasks = t.tasks.filter(task => task.date === d.currentDate.toLocaleDateString());
  
    return (
        <Container>
            <Title>Tasks for {d.currentDate.toLocaleDateString()}</Title>
            <TaskList>
              {filteredTasks.map(task => (
                <Container key = {task.id}>
                  {task.name}
                  <button lass="close-button" aria-label="Close alert" type="button" data-close onClick={() => removeTask(task.id)}>&times;</button>
                </Container>
            ))}
                <form onSubmit={addTask(name)}>
                  <input placeholder = "Enter Task"/>
                    <button type="submit">
                      Submit
                    </button>  
                </form>
              <button onClick={addTask}>Add Task</button>
            </TaskList>
        </Container>
    );
  }
  
  export default Tasks;