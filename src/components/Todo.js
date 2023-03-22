import React, { useState } from 'react';

export default function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);

  const [newName, setNewName] = useState();
  const [newDescription, setNewDescription] = useState();

  // Change a Task's Name
  function handleChange(e) {
    setNewName(e.target.value);
  }

  // Change a Task's Name
  function handleChangeDescription(e) {
    setNewDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName.length > 0) {
      props.editTask(props.id, newName, newDescription);
    }
    setIsEditing(false);
  }

  // Editing or Viewing Templates
  const editingTemplate = (
    <form className='stack-small' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='todo-label' htmlFor={props.id}>
          New name for <b>{props.name}</b>
        </label>
        <br />
        <span id='noEmpty'>*Can't be empty</span>
        <input
          id={props.id}
          className='todo-text'
          type='text'
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label className='todo-description' htmlFor={props.id}>
          Add short description for <b>{props.name}</b>
        </label>
        <input
          id={props.id}
          className='todo-text-description'
          type='text'
          value={newDescription}
          onChange={handleChangeDescription}
        />
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn todo-cancel'
          onClick={() => setIsEditing(false)}
        >
          Cancel
          <span className='visually-hidden'>renaming {props.name}</span>
        </button>
        <button type='submit' className='btn btn__primary todo-edit'>
          Save
          <span className='visually-hidden'>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input
          id={props.id}
          type='checkbox'
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className='todo-label' htmlFor={props.id}>
          {props.name}
        </label>
        <label className='todo-description' htmlFor={props.id}>
          {props.description}
        </label>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn'
          onClick={() => setIsEditing(true)}
        >
          Edit <span className='visually-hidden'>{props.name}</span>
        </button>
        <button
          type='button'
          className='btn btn__danger'
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className='visually-hidden'>{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
}
