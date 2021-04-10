import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'


let UserProfile=()=>{
return (
    <div className='profile'>
        <Link to="/sign-up">
            <i class="fas fa-user-circle"></i>
        </Link>        
    </div> 
);
}
export default UserProfile;