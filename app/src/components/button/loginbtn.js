import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

function Button() {
  return (
      <Link to='/login'>
        <button className='btn'>login</button>
      </Link> 
  );
}
export default Button;