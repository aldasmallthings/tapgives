import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'


let Profile=()=>{
return (
    <div className='profile'>
        <Link to="/sign-up">
            <i class="fas fa-user-circle"></i>
        </Link>        
    </div> 
);
}
export default Profile;