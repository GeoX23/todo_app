import React, { useState } from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';

// Set Filter Statuses
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  // State Declarations
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  // Completed or Not Functionality
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
  }

  // Delete a Task
  function deleteTask(id) {
    const deletedTasks = tasks.filter((task) => id !== task.id);
    setTasks(deletedTasks);
    localStorage.setItem('Tasks', JSON.stringify(deletedTasks));
  }

  // Edit Name/ToDo
  function editTask(id, newName, newDescription) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // return statement
        return { ...task, name: newName, description: newDescription };
      }
      return task;
    });
    // setTasks(editedTaskList);
    setTasks(editedTaskList);
  }

  // Get the Task List and Filters
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        description={task.description}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    ));

  // Save Tasks in LocalStoage
  localStorage.setItem('Tasks', JSON.stringify(tasks));

  // Get the Filter List
  const filterList = FILTER_NAMES?.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    // Check if Task's Name is empty
    if (name === '') {
      alert('Please enter Task Name');
    } else {
      const newTask = {
        id: `todo-${nanoid()}`,
        name,
        completed: false,
        description: 'Add a short Desc',
      };
      setTasks([...tasks, newTask]);
      console.log(tasks);
    }
  }

  return (
    <div className='todoapp stack-large'>
      <h1>BrainList</h1>
      <span id='subTitle'>Keep tasks in a list, not in your brain.</span>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>{filterList}</div>
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
