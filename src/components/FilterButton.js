import React from 'react';

export default function FilterButton(props) {
  return (
    <div className='filters btn-group stack-exception'>
      <button type='button' className='btn toggle-btn' aria-pressed='true'>
        <span className='visually-hidden'>Show </span>
        <span>{props.text}</span>
        <span className='visually-hidden'> tasks</span>
      </button>
    </div>
  );
}
