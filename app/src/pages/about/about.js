import React from 'react'
import Navbar from '../../components/navbar/nav';
import UserProfile from '../../components/profile/profile'
import './style.css'


let About =()=>{
    return (
    <>
        <Navbar component={UserProfile} />
        <div className="about-page">
            <h2>About page under construction!</h2>
        </div>
    </>
    );
}

export default About;