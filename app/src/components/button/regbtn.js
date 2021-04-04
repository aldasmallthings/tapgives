import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

function Button() {
  return (
      <Link to='/sign-up'>
        <button className='btn'>signup</button>
      </Link> 
  );
}
export default Button;