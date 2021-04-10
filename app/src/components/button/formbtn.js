import React from 'react';
import './button.css';

function Formbtn(props) {
return (
    <button className='formbtn'>
        {props.name}
    </button>
);
}
export default Formbtn;