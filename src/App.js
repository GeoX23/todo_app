import React, { useState } from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        if (task.completed === true) {
          task.completed = false;
        } else task.completed = true;
        return { ...task };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(updatedTasks);
  }

  function deleteTask(id) {
    console.log('Before Deletion', tasks);
    const deletedTasks = tasks.filter((task) => id !== task.id);
    setTasks(deletedTasks);
    console.log('After Deletion', deletedTasks);
  }

  function editTask(id) {}
  const taskList = tasks?.map((task) => (
    <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>
        <FilterButton text='All' />
        <FilterButton text='Working' />
        <FilterButton text='Completed' />
      </div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  );
}
